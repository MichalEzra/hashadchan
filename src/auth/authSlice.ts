import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserType = "PARENT" | "ADMIN" | "MATCHMAKER" | "CANDIDATE" | null;

interface AuthState {
  userType: UserType;
}

const initialState: AuthState = {
  userType: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserType: (state, action: PayloadAction<UserType>) => {
      state.userType = action.payload;
    },
    clearUser: (state) => {
      state.userType = null;
    },
  },
});

export const { setUserType, clearUser } = authSlice.actions;
export default authSlice.reducer;
