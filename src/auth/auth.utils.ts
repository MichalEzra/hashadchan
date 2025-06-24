import { raw } from "express";
import { PATHS } from "../routes/Paths";
import { AuthUser, User, UserLoginType } from "../types/user.types";
import axios from "../utils/axios";
// import  jwtDecode  from "jwt-decode";

export type JwtPayload = {
  email: string;
  name: string;
  role: string;
  nameid: string;
  exp: number;
};

export const setSession = ( token: string) => {
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

//מה הפונקציה הזאת עושה??
export function jwtDecode(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        window
            .atob(base64)
            .split('')
            .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
            .join('')
    );

    return JSON.parse(jsonPayload);
}

export const isValidToken = (token: string): boolean => {
  if (!token) return false;
  try {
    const decoded: any = jwtDecode(token);
    console.log("Decoded inside isValidToken:", decoded);
    const currentTime = Date.now() / 1000;
        if (!decoded.exp) {
            console.warn("אין שדה exp בטוקן");
            return false;
        }

    return decoded.exp && decoded.exp > currentTime;
  } catch (err) {
    return false;
  }
};

export function getUserFromToken(): User | null {
  const token = localStorage.getItem('token');
  if (!token || token.split('.').length !== 3) {
    console.warn("⚠️ טוקן לא תקין או ריק");
    return null;
  }

  const payload = parseJWT(token);
  if (!payload || !payload.role) {
    console.warn("⚠️ פיענוח הטוקן נכשל או לא כולל role");
    return null;
  }

  return payload;
}


// export function getUserFromToken() {
//   const token = localStorage.getItem('token');
//   console.log('token שהתקבל מהשרת:', token);

//   if (!token) return null;
//   try {
//     return jwtDecode(token);
//   } catch {
//     return null;
//   }
// }

export function mapJwtClaims(rawToken: any): JwtPayload {
    const payload = parseJWT(rawToken);

  if (!payload) {
    console.error('❌ claims is null or undefined');
  }
  return {
    email: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
    name: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    role: payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
    nameid: payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
    exp: payload.exp,
  };
}

export function parseJWT(token: string) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("❌ שגיאה בפענוח הטוקן:", error);
    return null;
  }
}


// export const getUserFromToken = (token: string): JwtPayload | null => {
//   try {
//     if (!token) return null;
//     if (!isValidToken(token)) return null;
//     // Decode the JWT token to extract user information
//     console.log("Decoding token:", token);
//     console.log("Decoded token:", jwtDecode(token));
//     // Use jwtDecode to decode the token and return the payload
//     return jwtDecode<JwtPayload>(token);
//   } catch (error) {
//     return null;
//   }
// };


