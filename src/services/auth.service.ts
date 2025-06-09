import axios from "axios"
import { ENDPOINTS } from "../api/endpoints"
import { AuthUser } from "../types/user.types"

export const login = async (email: string, password: string): Promise<AuthUser> => {
  const response = await axios.post<AuthUser>(ENDPOINTS.login, { email, password });
  return response.data;
};
