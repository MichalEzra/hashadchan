import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchMaleMatches, fetchFemaleMatches, createNewMatch } from '../thunks/matches.thunks';
import { MatchResultsDto } from '../../types/candidateDto.types';
import { getEngagedMatches } from '../../services/match.service';
import { EngagedMatch } from '../../types/match.types';

interface MatchState {
  maleMatches: MatchResultsDto[];
  femaleMatches: MatchResultsDto[];
  engagedMatches: EngagedMatch[]; // ✅ חדש
  loading: boolean;
  error: string | null;
  matchCreationMessage: string | null;
}

const initialState: MatchState = {
  maleMatches: [],
  femaleMatches: [],
  engagedMatches: [], // ✅ חדש
  loading: false,
  error: null,
  matchCreationMessage: null,
};


export const fetchEngagedMatches = createAsyncThunk(
  'matches/fetchEngaged',
  async () => {
    const matches = await getEngagedMatches();
    return matches;
  }
);

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
      })
      // טיפול ב-fetchEngagedMatches
      .addCase(fetchEngagedMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.engagedMatches = []; // נקה תוצאות קודמות
      })
      .addCase(fetchEngagedMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.engagedMatches = action.payload;
      })
      .addCase(fetchEngagedMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'שגיאה בשליפת המאורסים';
      });
  },
});

export const { clearMatchCreationMessage } = matchSlice.actions;
export default matchSlice.reducer;