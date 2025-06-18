import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../redux/store";
import { login } from "../services/auth.service";
import { loginUser, setUser } from "../redux/auth/auth.slice";
// import { isValidToken, jwtDecode, setSession } from "../auth/auth.utils"
import { useNavigate } from "react-router";
import { log } from "console";
import { AuthUser, User, UserLoginType, UserType } from "../types/user.types";
type JwtPayload = {
  [key: string]: any; // אם את רוצה, אפשר גם להגדיר ספציפית את השדות
  name?: string;
  email?: string;
  nameidentifier?: string;
  phoneNumber?: string;
};
export default function LoginPage(){
    const [userData, setUserData] = useState({
        email: '', 
        password: ''
    })
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = event.target
        setUserData({...userData, [name]: value})
    }
// decode JWT token and extract payload

    // const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     try {
    //         // מפענחת את הטוקן
    //         const token: string = await login(userData.email, userData.password);
    //         // const {token} = authUser;
    //         // const token = authUser.token;
    //         console.log("token:", token);

    //         // const { token, user } = authUser;
    //         if (!isValidToken(token) || !token) {
    //             throw new Error("לא התקבל טוקן מהשרת");
    //         }
    //         localStorage.setItem("token", token);
    //         // מפענחת את הטוקן כדי לקבל את המידע של המשתמש
    //         const decoded: JwtPayload = jwtDecode(token);
    //         console.log("Decoded token:", decoded);

    //         // יוצרת את האובייקט User
    //         const user: UserLoginType = {
    //         email: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/Email"],
    //         fullName: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/Name"],
    //         userType: decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/Role"],
    //         // phoneNumber: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/phone"],
    //         id: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/NameIdentifier"],    
    //         // password: userData.password // שימי לב, זה לא מאובטח לשמור סיסמה בטוקן
    //     };

    //         setSession({ token, user });
    //         dispatch(setUser(user));

    //         // if (!isValidToken(token)) {
    //         //     throw new Error("טוקן לא תקף");
    //         // }

    //         // const decoded: JwtPayload = jwtDecode(token);
    //         // console.log("Decoded token:", decoded);

    //         console.log("exp:", decoded.exp);
    //         console.log("currentTime:", Date.now() / 1000);
    //         console.log("Decoded JWT:", decoded);
    //         console.log("Decoded JWT:", jwtDecode(token));

    //         // setSession({ token, user });
    //         // dispatch(setUser(user));
    //         navigate("/");
    //     } catch (error) {
    //         alert("שגיאה בהתחברות");
    //         console.log(error);
    //     }
    // };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await dispatch(loginUser(userData)).unwrap(); // חשוב: unwrap כדי לתפוס שגיאות
            navigate('/');
        } catch (err) {
            alert("שגיאה בהתחברות");
            console.error(err);
        }
        };

// const handleClick = () => {
//     console.log(userData); // שלח לשרת
//     setIsLoading(true);

//     setTimeout(() => {
//         setIsLoading(false);
//         alert('ההתחברות הושלמה!');
//     }, 2000);  
// };
    return <form onSubmit={handleSubmit}>
        <input name='email' value={userData.email} onChange={handleChange} />
        <input name='password' value={userData.password} onChange={handleChange} />
        <button>Login</button>
    </form>
}