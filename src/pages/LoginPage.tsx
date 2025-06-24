// import { ChangeEvent, FormEvent, useState } from "react";
// import { useAppDispatch } from "../redux/store";
// import { login } from "../services/auth.service";
// import { loginUser, setUser } from "../redux/auth/auth.slice";
// // import { isValidToken, jwtDecode, setSession } from "../auth/auth.utils"
// import { useNavigate } from "react-router";
// import { log } from "console";
// import { getSession, getUserFromToken, mapJwtClaims } from "../auth/auth.utils";
// import { AuthUser, User, UserLoginType, UserType } from "../types/user.types";
// type JwtPayload = {
//   [key: string]: any; // אם את רוצה, אפשר גם להגדיר ספציפית את השדות
//   name?: string;
//   email?: string;
//   nameidentifier?: string;
//   phoneNumber?: string;
// };
// export default function LoginPage(){
//     const [userData, setUserData] = useState({
//         email: '', 
//         password: ''
//     })
//     const dispatch = useAppDispatch();
//     const [isLoading, setIsLoading] = useState(false);
//     const navigate = useNavigate();

//     const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
//         const {name, value} = event.target
//         setUserData({...userData, [name]: value})
//     }
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         try {
//             await dispatch(loginUser(userData)).unwrap(); 
//             console.log("User logged in successfully");
        
//             const raw = getUserFromToken();
//             console.log("token data:", raw);
//             if (raw) {
//                 const user = mapJwtClaims(raw);
//                 console.log("user data:", user);
//                 console.log("שם:", user.name); // עכשיו זה קצר ונוח
//             }

//             // //  // קחי את המידע מהטוקן:
//             // // const userFromToken = getUserFromToken();
//             // // console.log("🌟 משתמש מהטוקן:", userFromToken);

//             // // if (userFromToken) {
//             // // console.log("שם המשתמש:", userFromToken.name); // 👈 זה השם מהטוקן
//             // }
//             // חשוב: unwrap כדי לתפוס שגיאות
        
//             navigate('/');
//         } catch (err) {
//             alert("שגיאה בהתחברות");
//             console.error(err);
//         }
//         };

// // const handleClick = () => {
// //     console.log(userData); // שלח לשרת
// //     setIsLoading(true);

// //     setTimeout(() => {
// //         setIsLoading(false);
// //         alert('ההתחברות הושלמה!');
// //     }, 2000);  
// // };
//     return <form onSubmit={handleSubmit}>
//         <input name='email' value={userData.email} onChange={handleChange} />
//         <input name='password' value={userData.password} onChange={handleChange} />
//         <button>Login</button>
//     </form>
// }