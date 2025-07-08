import { createAsyncThunk } from "@reduxjs/toolkit";
import {  createMatchmaker, getAllMatchmakers, updateMatchmaker } from "../../services/matchmaker.service";
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
export const createMatchmakerThunk = createAsyncThunk(
  'matchmakers/create',
  async (newMatchmaker: FormData, { rejectWithValue }) => {
    try {
      const response = await createMatchmaker(newMatchmaker)
      return response; // מועמד חדש
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// thunk/updateMatchmakerThunk.ts

interface UpdateMatchmakerPayload {
  id: number;
  formData: FormData;
}

export const updateMatchmakerThunk = createAsyncThunk(
  'matchmaker/update',
  async ({ id, formData }: UpdateMatchmakerPayload) => {
    await updateMatchmaker(id, formData);
  }
);

