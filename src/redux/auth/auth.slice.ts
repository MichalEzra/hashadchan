// redux/auth/auth.slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'lucide-react';
import { UserType } from '../../types/enums';
import { getUserFromToken, jwtDecode, mapJwtClaims } from '../../auth/auth.utils';
import { get } from 'http';

// טייפים
interface User {
  id?: Number;
  fullName?: string;
  email?: string;
  userType?: UserType;
  // status: 'ACTIVE' | 'INACTIVE' | 'PENDING' | 'SUSPENDED';
  // profileCompleted?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

// Initial State
const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem('token'),
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const loadUserFromToken = createAsyncThunk('auth/loadUserFromToken', async (token: string) => {
  // כאן אפשר לפענח את הטוקן ולשלוף פרטי משתמש
  const user = mapJwtClaims(token);
  return user;
});



export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/User/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'שגיאה בהתחברות');
      }
      const token = await response.text();
      localStorage.setItem('token', token);
      return { token }; // נחזיר כאובייקט עם token

    } catch (error: any) {
      return rejectWithValue(error.message || 'שגיאה בהתחברות');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: {
    fullName: string;
    email: string;
    password: string;
    phoneNumber: string;
    userType: UserType;
  }, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/User', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'שגיאה בהרשמה');
      }

      const data = await response.json();

      // שמירת הטוכן אם הרשמה מצליחה מיד
      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'שגיאה בהרשמה');
    }
  }
);


// בתוך auth.slice.ts
function parseJWT(token: string) {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (e) {
    console.error('שגיאה בפענוח הטוקן:', e);
    return null;
  }
}

// Auth Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.token = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    // loadUserFromToken
    builder
      .addCase(loadUserFromToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadUserFromToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        if (!action.payload || !action.payload.role) {
          state.user = null;
          state.isAuthenticated = false;
        } else {
          const upperRole = action.payload.role?.toUpperCase();
          const validRole = Object.values(UserType).includes(upperRole as UserType)
            ? (upperRole as UserType)
            : undefined;
          state.user = {
            ...action.payload,
            userType: validRole, // שימי לב לזה
          };
          state.isAuthenticated = true;
        }
      })
      .addCase(loadUserFromToken.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });

    // loginUser
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const parsedUser = parseJWT(action.payload.token);
        state.isLoading = false;
        state.token = action.payload.token;
        state.user = parsedUser;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // registerUser
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = !!action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser, clearError, setUser } = authSlice.actions;
export default authSlice.reducer;