import { raw } from "express";
import { PATHS } from "../routes/Paths";
import { AuthUser, JwtUser, JwtUserType } from "../types/user.types";
import axios from "../utils/axios";
import { UserType } from "../types/enums";
// import jwtDecode from "jwt-decode";

// import  jwtDecode  from "jwt-decode";
interface UserClaims {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'?: string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'?: string;
  exp?: number; // זמן תפוגה, בדרך כלל בשניות מאז תקופת יוניקס
  [key: string]: any; // מאפשר מאפיינים נוספים שלא הוגדרו במפורש
}

export type JwtPayload = {
  email: string;
  name: string;
  role: string;
  nameid: string;
  exp: number;
};

export const setSession = (token: string) => {
  localStorage.setItem('token', token)
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const setAuthorizationHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

export const getSession = (): AuthUser | null => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  return user
}

export const removeSession = () => {
  localStorage.removeItem('user');
  axios.defaults.headers.common.Authorization = undefined;
  window.location.href = PATHS.login;
}

// //מה הפונקציה הזאת עושה??
// export function jwtDecode(token: string) {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//         window
//             .atob(base64)
//             .split('')
//             .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
//             .join('')
//     );

//     return JSON.parse(jsonPayload);
// }

export const jwtDecode = (token: string | null): UserClaims | null => {
  // ודא שהטוקן קיים והוא מחרוזת
  if (!token || typeof token !== 'string') {
    console.error('❌ שגיאה בפענוח הטוקן: הטוקן אינו מחרוזת או שהוא ריק/null.', { receivedToken: token });
    return null;
  }

  try {
    // טוקן JWT מורכב משלושה חלקים מופרדים בנקודות: header.payload.signature
    const parts = token.split('.');

    // ודא שמבנה הטוקן תקין (שלושה חלקים)
    if (parts.length !== 3) {
      console.error('❌ שגיאה בפענוח הטוקן: מבנה טוקן לא תקין. צפוי: header.payload.signature', { token });
      return null;
    }

    // החלק השני הוא ה-payload המקודד ב-Base64
    const payloadEncoded = parts[1];

    // פענוח Base64 ו-parsing ל-JSON
    const decodedPayload = atob(payloadEncoded); // atob משמש לפענוח Base64
    console.log(decodedPayload)
    return JSON.parse(decodedPayload);
  } catch (error) {
    // ללכוד שגיאות כמו פענוח Base64 לא תקין או JSON parsing
    console.error('❌ שגיאה בפענוח הטוקן:', error);
    return null;
  }
};

/**
 * ממפה את ה-claims (טענות) של טוקן JWT לאובייקט משתמש פשוט.
 * הפונקציה ממירה את מפתחות ה-claims הארוכים (URL-ים) למאפיינים קצרים וקריאים יותר
 * ומבצעת בדיקות תקינות על הנתונים.
 * @param claims ה-claims המפוענחים מתוך טוקן JWT.
 * @returns אובייקט מסוג User או null אם ה-claims אינם תקינים/חסרים.
 */
export const mapJwtClaims = (claims: UserClaims | null): JwtUser | null => {
  // ודא שה-claims אינם null או undefined
  if (!claims) {
    console.error('❌ Claims are null or undefined, cannot map to User.');
    return null;
  }
  console.log("📦 Claims מהטוקן:", claims);

  // חילוץ המאפיינים הרלוונטיים מה-claims באמצעות מפתחות ה-URL המלאים
  const userIdClaim = claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  const emailClaim = claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
  const fullNameClaim = claims['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  const roleClaim = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  // ודא שכל הפרטים החיוניים קיימים
  if (!userIdClaim || !emailClaim || !fullNameClaim || !roleClaim) {
    console.error('❌ חסרים פרטי משתמש חיוניים בטוקן. לא ניתן למפות לאובייקט משתמש.', { claims });
    return null;
  }

  // המרת תפקיד המשתמש (roleClaim) ל-UserType מוגדר, עם ערך ברירת מחדל 'GUEST'
  const userType: JwtUser['userType'] = ['PARENT', 'CANDIDATE', 'MATCHMAKER', 'ADMIN']
    .includes(roleClaim.toUpperCase())
    ? (roleClaim.toUpperCase() as JwtUser['userType']) // וודא התאמה לטיפוסים המוגדרים שלך
    : 'GUEST';

  // יצירת והחזרת אובייקט ה-User
  return {
    id: Number(userIdClaim),
    email: emailClaim,
    fullName: fullNameClaim,
    userType: userType,
    // הוסף כאן מאפיינים נוספים אם יש צורך למפות אותם מה-claims
  };
};

/**
 * בודק אם טוקן JWT תקין ולא פג תוקף.
 * הפונקציה מפענחת את הטוקן, בודקת את תקינותו ואת תאריך התפוגה שלו.
 * @param token מחרוזת טוקן ה-JWT.
 * @returns true אם הטוקן תקין ולא פג תוקף, false אחרת.
 */
export const isValidToken = (token: string | null): boolean => {
  // אם הטוקן ריק, הוא אינו תקין
  if (!token) {
    console.warn('אין טוקן לבדיקה. מחזיר false.');
    return false;
  }

  // נסה לפענח את הטוקן
  const claims = jwtDecode(token);
  // אם הפענוח נכשל, הטוקן אינו תקין
  if (!claims) {
    console.warn('פענוח הטוקן נכשל. מחזיר false.');
    return false;
  }

  // בדיקת תפוגת הטוקן באמצעות ה-claim 'exp'
  if (claims.exp) {
    // זמן נוכחי בשניות מאז תקופת יוניקס
    const currentTime = Date.now() / 1000;
    // אם זמן התפוגה עבר, הטוקן פג תוקף
    if (claims.exp < currentTime) {
      console.warn('טוקן פג תוקף. מחזיר false.');
      return false;
    }
  } else {
    // אם אין claim של תפוגה, ייתכן שזו שגיאת הגדרה או טוקן שאינו סטנדרטי.
    // לשם בטיחות, נתייחס לכך כאזהרה, אך נאפשר לו לעבור אם אין דרישת תפוגה מפורשת.
    // ביישומים קריטיים, לרוב טוקן ללא EXP ייחשב כלא תקין.
    console.warn('חסר פרטי תוקף (exp) בטוקן. אנא וודא שהטוקן מכיל את ה-claim הזה.');
  }

  // אם כל הבדיקות עברו, הטוקן נחשב תקין
  return true;
};
