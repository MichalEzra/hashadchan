import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Candidate } from "../../types/candidate.types";

// שליפת כל המועמדים
export const fetchCandidates = createAsyncThunk(
  "candidates/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/api/candidates");
      return response.data; // רשימת מועמדים
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
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
