import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { isValidToken, jwtDecode, mapJwtClaims, setAuthorizationHeader } from '../../auth/auth.utils';
import { login as authServiceLogin, register as authServiceRegister } from '../../services/auth.service';
import { JwtUser, RegisterUserDto } from '../../types/user.types';
import { UserType } from '../../types/enums';

// טיפוס מצב האותנטיקציה
interface AuthState {
    user: JwtUser | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

// מצב התחלתי
const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isLoading: false,
    error: null,
    isAuthenticated: false,
};

// ✨ פונקציה עזר לפענוח טוקן
const processToken = (token: string): { user: JwtUser; token: string } | null => {
    const claims = jwtDecode(token);
    if (!claims) return null;
    const user = mapJwtClaims(claims);
    if (!user) return null;
    return { user, token };
};

// טעינת משתמש מטוקן
export const loadUserFromToken = createAsyncThunk(
    'auth/loadUserFromToken',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            if (token && isValidToken(token)) {
                const claims = jwtDecode(token);
                const user = mapJwtClaims(claims);
                if (user) return user;
            }
            localStorage.removeItem('token');
            return rejectWithValue('Invalid or missing token.');
        } catch (error: any) {
            localStorage.removeItem('token');
            return rejectWithValue(error.message || 'Failed to load user from token.');
        }
    }
);

// התחברות
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const token = await authServiceLogin(credentials.email, credentials.password);
            const result = processToken(token);
            if (!result) return rejectWithValue('טוקן התחברות לא תקין.');
            localStorage.setItem('token', token);
            // setAuthorizationHeader(token);
            return result;
        } catch (error: any) {
            localStorage.removeItem('token');
            return rejectWithValue(error.message || 'שגיאה בהתחברות');
        }
    }
);


// registerUser עם התחברות מיידית
type RegisterResult =
  | { user: JwtUser; token: string }
  | { message: string };

export const registerUser = createAsyncThunk<RegisterResult, RegisterUserDto>(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      console.log('📩 שולח בקשת הרשמה:', userData.email);

      const response = await authServiceRegister(userData);

      // אם יש הודעת מערכת (למשל: ממתין לאישור מנהל) — לא נבצע login
      if ('message' in response) {
        return response;
      }

      // login אוטומטי
      const token = await authServiceLogin(userData.email, userData.password);
      const result = processToken(token);

      if (!result) {
        return rejectWithValue('ההתחברות לאחר ההרשמה נכשלה: טוקן לא תקין.');
      }

      localStorage.setItem('token', token);
      return result;

    } catch (error: any) {
      console.error("❌ שגיאה בהרשמה או התחברות:", error);
      localStorage.removeItem('token');
      return rejectWithValue(error.message || 'שגיאה בהרשמה או התחברות');
    }
  }
);
