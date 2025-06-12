import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../redux/store";
import { login } from "../services/auth.service";
import { setUser } from "../redux/auth/auth.slice";
import { isValidToken, jwtDecode, setSession } from "../auth/auth.utils"
import { useNavigate } from "react-router";
import { log } from "console";
import { AuthUser, User } from "../types/user.types";
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

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {


            // מפענחת את הטוקן
            const authUser: AuthUser = await login(userData.email, userData.password);
            console.log("authUser:", authUser);

            const { token, user } = authUser;
            if (!isValidToken(token)) {
                throw new Error("טוקן לא תקף");
            }

            const decoded: JwtPayload = jwtDecode(token);
            console.log("Decoded token:", decoded);

            console.log("exp:", decoded.exp);
            console.log("currentTime:", Date.now() / 1000);
            console.log("Decoded JWT:", decoded);
            console.log("Decoded JWT:", jwtDecode(token));

            setSession({ token, user });
            dispatch(setUser(user));
            navigate("/");
        } catch (error) {
            alert("שגיאה בהתחברות");
            console.log(error);
        }
    };

const handleClick = () => {
    console.log(userData); // שלח לשרת
    setIsLoading(true);

    setTimeout(() => {
        setIsLoading(false);
        alert('ההתחברות הושלמה!');
    }, 2000);  
};
    return <form onSubmit={handleSubmit}>
        <input name='email' value={userData.email} onChange={handleChange} />
        <input name='password' value={userData.password} onChange={handleChange} />
        <button>Login</button>
    </form>
}