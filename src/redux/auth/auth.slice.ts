// src/redux/auth/auth.slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { isValidToken, jwtDecode, mapJwtClaims, setAuthorizationHeader } from '../../auth/auth.utils';
import { login as authServiceLogin, register as authServiceRegister } from '../../services/auth.service';
import { JwtUser, RegisterUserDto } from '../../types/user.types';
import { UserType } from '../../types/enums';
import { loadUserFromToken, loginUser, registerUser } from '../thunks/auth.thunk';

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
        const payload = action.payload;
        if (payload && 'user' in payload && 'token' in payload) {
          state.user = payload.user;
          state.token = payload.token;
          state.isAuthenticated = true;
        } else {
          // אם אין user/token – כנראה קיבלת רק message או null
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
        }
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
