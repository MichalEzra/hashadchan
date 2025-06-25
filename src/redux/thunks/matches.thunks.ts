import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMaleMatchProposals, getFemaleMatchProposals, createMatch } from '../../services/match.service';
import { MatchRequest } from '../../types/candidateDto.types';

// Thunk לקבלת הצעות שידוכים לבנים
export const fetchMaleMatches = createAsyncThunk(
  'matches/fetchMaleMatches',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getMaleMatchProposals();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk לקבלת הצעות שידוכים לבנות
export const fetchFemaleMatches = createAsyncThunk(
  'matches/fetchFemaleMatches',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFemaleMatchProposals();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Thunk ליצירת שידוך חדש
export const createNewMatch = createAsyncThunk(
  'matches/createNewMatch',
  async (matchRequest: MatchRequest, { rejectWithValue }) => {
    try {
      const response = await createMatch(matchRequest);
      return response.data; // או הודעה מתאימה מהשרת
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);