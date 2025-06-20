import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import {  getAllMatchmakers } from "../../services/matchmaker.service";
import { Matchmaker } from "../../types/matchmaker.types";

// שליפת כל המועמדים
export const fetchMatchmakers = createAsyncThunk<Matchmaker[], void>(
  "matchmakers/fetchmatchmakers",
  async (_, thunkAPI) => {
        console.log('thunkAPI:', thunkAPI); // בדוק מה יש כאן
        const { rejectWithValue } = thunkAPI;
    try {
      const matchmaker = await getAllMatchmakers(); // ודא שאתה קורא לפונקציה הזו
      return matchmaker;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// יצירת מועמד חדש
export const createMatchmaker = createAsyncThunk(
  "matchmakers/create",
  async (newMatchmaker: FormData, thunkAPI) => {
    try {
      const response = await axios.post("/api/matchmaker", newMatchmaker, {
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
