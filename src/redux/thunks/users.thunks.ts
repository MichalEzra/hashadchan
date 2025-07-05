import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types/user.types";
import { getAllUsers } from "../../services/user.service";

// שליפת כל המשתמשים
export const fetchUsers = createAsyncThunk<User[], void>(
  "users/fetchUsers",
  async (_, thunkAPI) => {
        console.log('thunkAPI:', thunkAPI); // בדוק מה יש כאן
        const { rejectWithValue } = thunkAPI;
    try {
      const users = await getAllUsers(); // ודא שאתה קורא לפונקציה הזו
      console.log(users)
      return users;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// יצירת משתמש חדש
export const createUser = createAsyncThunk(
  "users/create",
  async (newUser: FormData, thunkAPI) => {
    try {
      const response = await axios.post("/api/users", newUser, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data; // מועמד חדש
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
