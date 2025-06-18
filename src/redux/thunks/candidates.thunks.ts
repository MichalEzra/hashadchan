import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { Candidate } from "../../types/candidate.types";
import {  getCandidates } from "../../services/candidate.service";

// שליפת כל המועמדים
export const fetchCandidates = createAsyncThunk<Candidate[], void>(
  "candidates/fetchCandidates",
  async (_, thunkAPI) => {
        console.log('thunkAPI:', thunkAPI); // בדוק מה יש כאן
        const { rejectWithValue } = thunkAPI;
    try {
      const candidates = await getCandidates(); // ודא שאתה קורא לפונקציה הזו
      return candidates;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// יצירת מועמד חדש
export const createCandidate = createAsyncThunk(
  "candidates/create",
  async (newCandidate: FormData, thunkAPI) => {
    try {
      const response = await axios.post("/api/candidates", newCandidate, {
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
