import axios from "axios";
import { ENDPOINTS } from "../api/endpoints"
import { User } from "../types/user.types"

export const login = async (email: string, password: string): Promise<string> => {
  console.log("📩 Sending login request to API");
  try {
    // Assuming your backend expects { email, password } and returns the JWT token as plain text.
    const response = await axios.post<string>(ENDPOINTS.login, { email, password });
    console.log("response date: ", response.data)
    return response.data; // The JWT token string
  } catch (error: any) {
    let errorMessage = 'Login failed';
    if (axios.isAxiosError(error) && error.response) {
      // Backend returned an error response
      errorMessage = error.response.data || errorMessage;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("❌ Login API error:", error);
    throw new Error(errorMessage);
  }
};

type RegisterResponse = User | { message: string };

export const register = async (userData: Omit<User, 'id'>): Promise<RegisterResponse> => {
  console.log("📩 Sending registration request to API");
  try {
    const response = await axios.post<RegisterResponse>(ENDPOINTS.register, userData);
    return response.data;
  } catch (error: any) {
    let errorMessage = 'Registration failed';
    if (axios.isAxiosError(error) && error.response) {
      if (typeof error.response.data === 'object' && error.response.data !== null && 'message' in error.response.data) {
        errorMessage = error.response.data.message;
      } else if (typeof error.response.data === 'string') {
        errorMessage = error.response.data;
      } else {
        errorMessage = 'Registration failed due to an unknown server error.';
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("❌ Registration API error:", error);
    throw new Error(errorMessage);
  }
};

