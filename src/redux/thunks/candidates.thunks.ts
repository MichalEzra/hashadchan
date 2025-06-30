// redux/thunks/candidateThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Candidate } from "../../types/candidate.types";
import {
  getCandidates,
  createCandidate as createCandidateApi,
  deleteCandidate as deleteCandidateApi,
  updateCandidate as updateCandidateApi,
} from "../../services/candidate.service";

// שליפת כל המועמדים
export const fetchCandidates = createAsyncThunk<Candidate[], void>(
  "candidates/fetchCandidates",
  async (_, thunkAPI) => {
    try {
      return await getCandidates();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// יצירת מועמד חדש
export const createCandidate = createAsyncThunk<Candidate, FormData>(
  "candidates/create",
  async (formData, thunkAPI) => {
    try {
      return await createCandidateApi(formData);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// מחיקת מועמד לפי מזהה
export const deleteCandidateById = createAsyncThunk<number, number>(
  "candidates/deleteById",
  async (id, thunkAPI) => {
    try {
      await deleteCandidateApi(id);
      return id;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// עדכון מועמד
export const updateCandidate = createAsyncThunk<Candidate, { id: number; data: FormData }>(
  "candidates/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateCandidateApi(id, data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);
