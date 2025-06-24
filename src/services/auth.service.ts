import axios from "axios";
import { ENDPOINTS } from "../api/endpoints"
import { User } from "../types/user.types"

export const login = async (email: string, password: string): Promise<string> => {
  console.log("📩 שולח בקשה להתחברות");
  const response = await axios.post<string>(ENDPOINTS.login, { email, password });
  return response.data;
};

export const Signup = async (user: User):Promise<User>=>{
  console.log("📩 שולח בקשה להרשמה");
    const response = await axios.post<User>(ENDPOINTS.signup, user);
    return response.data;
}