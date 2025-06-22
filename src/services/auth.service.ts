import axios from "axios";
import { ENDPOINTS } from "../api/endpoints"
import { AuthUser, User } from "../types/user.types"

export const login = async (email: string, password: string): Promise<string> => {
  const response = await axios.post<string>(ENDPOINTS.login, { email, password });
  return response.data;
};

export const Signup = async (user: User):Promise<User>=>{
    const response = await axios.post<User>(ENDPOINTS.signup, user);
    return response.data;
}