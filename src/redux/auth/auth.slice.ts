// src/redux/auth/auth.slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { isValidToken, jwtDecode, mapJwtClaims, setAuthorizationHeader } from '../../auth/auth.utils';
import { login as authServiceLogin, register as authServiceRegister } from '../../services/auth.service';
import {  JwtUser, RegisterUserDto } from '../../types/user.types';

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
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    userData: RegisterUserDto,
    { dispatch, rejectWithValue }
  ) => {
    try {
      console.log('📩 שולח בקשת הרשמה:', userData.email);

      // קודם כל — מבצע הרשמה
      await authServiceRegister(userData);

      // לאחר הרשמה מוצלחת — מנסה להתחבר מיד
      const token = await authServiceLogin(userData.email, userData.password);

      // מפענח טוקן
      const result = processToken(token);
      if (!result) {
        return rejectWithValue('ההתחברות לאחר ההרשמה נכשלה: טוקן לא תקין.');
      }

      // שומר טוקן ב-localStorage
      localStorage.setItem('token', token);
      // setAuthorizationHeader(token);

      return result;

    } catch (error: any) {
      console.error("❌ שגיאה בהרשמה או התחברות:", error);
      localStorage.removeItem('token');
      return rejectWithValue(error.message || 'שגיאה בהרשמה או התחברות');
    }
  }
);


// ✅ ה-Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    clearError(state) {
      state.error = null;
    },
    setUser(state, action: PayloadAction<JwtUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserFromToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loadUserFromToken.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
