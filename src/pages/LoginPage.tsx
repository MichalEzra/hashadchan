import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../redux/store";
import { login } from "../services/auth.service";
import { setUser } from "../redux/auth/auth.slice";
import { setSession } from "../auth/auth.utils";


export default function LoginPage(){
    const [userData, setUserData] = useState({
        email: '', 
        password: ''
    })
    const dispatch = useAppDispatch();
    
    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>{
        const {name, value} = event.target
        setUserData({...userData, [name]: value})
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
         try {
            const authUser = await login(userData.email, userData.password);
            dispatch(setUser(authUser.user))
            setSession(authUser)
        } catch (error) {
            console.log(error)
        }
    }

    return <form onSubmit={handleSubmit}>
        <input name='email' value={userData.email} onChange={handleChange} />
        <input name='password' value={userData.password} onChange={handleChange} />
        <button>Login</button>
    </form>
}