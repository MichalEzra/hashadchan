import { createSlice } from '@reduxjs/toolkit';
import { fetchMaleMatches, fetchFemaleMatches, createNewMatch } from '../thunks/matches.thunks';
import { MatchResultsDto } from '../../types/candidateDto.types';

interface MatchState {
  maleMatches: MatchResultsDto[];
  femaleMatches: MatchResultsDto[];
  loading: boolean;
  error: string | null;
  matchCreationMessage: string | null;
}

const initialState: MatchState = {
  maleMatches: [],
  femaleMatches: [],
  loading: false,
  error: null,
  matchCreationMessage: null,
};

const matchSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    clearMatchCreationMessage: (state) => {
      state.matchCreationMessage = null;
      state.error = null; // נקה גם שגיאות
    },
  },
  extraReducers: (builder) => {
    builder
      // טיפול ב-fetchMaleMatches
      .addCase(fetchMaleMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.maleMatches = []; // נקה תוצאות קודמות
      })
      .addCase(fetchMaleMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.maleMatches = action.payload;
      })
      .addCase(fetchMaleMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // טיפול ב-fetchFemaleMatches
      .addCase(fetchFemaleMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.femaleMatches = []; // נקה תוצאות קודמות
      })
      .addCase(fetchFemaleMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.femaleMatches = action.payload;
      })
      .addCase(fetchFemaleMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // טיפול ב-createNewMatch
      .addCase(createNewMatch.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.matchCreationMessage = null;
      })
      .addCase(createNewMatch.fulfilled, (state) => {
        state.loading = false;
        state.matchCreationMessage = 'השידוך נוצר בהצלחה!';
        // אופציונלי: רענן את רשימת ההצעות לאחר יצירת שידוך
        // state.maleMatches = [];
        // state.femaleMatches = [];
      })
      .addCase(createNewMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'אירעה שגיאה ביצירת השידוך.';
        state.matchCreationMessage = null; // נקה הודעה קודמת אם הייתה הצלחה
      });
  },
});

export const { clearMatchCreationMessage } = matchSlice.actions;
export default matchSlice.reducer;