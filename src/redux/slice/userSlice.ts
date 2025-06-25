// redux/slices/users.slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/user.types";
import { fetchUsers } from "../thunks/users.thunks";

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers: (state) => {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        console.log("✅ קיבלנו את המשתמשים:", action.payload);
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "שגיאה בקבלת המשתמשים";
      });
  },
});

export const { clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
