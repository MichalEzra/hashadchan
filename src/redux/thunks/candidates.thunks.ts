// redux/thunks/candidateThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { CandidateDto } from "../../types/candidateDto.types";
import {
  getCandidates,
  createCandidate as createCandidateApi,
  deleteCandidate as deleteCandidateApi,
  updateCandidate as updateCandidateApi,
  getCandidateByUserId,
} from "../../services/candidate.service";
import { getMyCandidate } from "../../services/user.service";

// שליפת כל המועמדים
export const fetchCandidates = createAsyncThunk<CandidateDto[], void>(
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
export const createCandidate = createAsyncThunk<CandidateDto, FormData>(
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
export const updateCandidateThunk = createAsyncThunk<CandidateDto, { id: number; data: FormData }>(
  "candidates/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await updateCandidateApi(id, data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMyCandidate = createAsyncThunk(
  'candidates/fetchMyCandidate',
  async (userId: number, { rejectWithValue }) => {
    try {
      const candidate = await getCandidateByUserId(userId);


      return candidate;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
