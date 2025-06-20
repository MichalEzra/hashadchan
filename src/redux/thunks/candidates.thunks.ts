import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";
import { Candidate } from "../../types/candidate.types";
import {  deleteCandidate, getCandidates } from "../../services/candidate.service";

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

// דוגמה בתוך ה־thunk:
export const deleteCandidateById = createAsyncThunk(
  'candidates/deleteById',
  async (id: number) => {
    await axios.delete(`/api/candidate/${id}`);
    return id; // או return deletedCandidate אם אתה רוצה להחזיר את כולו
  }
);


export const updateCandidate = createAsyncThunk(
  "candidates/update",
  async ({ id, data }: { id: number; data: FormData }) => {
    const response = await axios.put(`/api/candidate/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data; // מחזיר את המועמד המעודכן
  }
);

