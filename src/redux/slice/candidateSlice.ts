import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CandidateDto } from "../../types/candidateDto.types";
import { fetchCandidates, createCandidate, deleteCandidateById, updateCandidateThunk, fetchMyCandidate } from "../thunks/candidates.thunks";

interface CandidatesState {
  candidates: CandidateDto[];
  currentCandidate: CandidateDto | null;  // <-- שדה למועמד נוכחי

  loading: boolean;
  error: string | null;
}

const initialState: CandidatesState = {
  candidates: [],
  currentCandidate: null,
  loading: false,
  error: null,
};

const candidateSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    clearCandidates: (state) => {
      state.candidates = [];
      state.currentCandidate = null;
    },
    setCurrentCandidate: (state, action: PayloadAction<CandidateDto>) => {
      state.currentCandidate = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action: PayloadAction<CandidateDto[]>) => {
        state.loading = false;
        state.candidates = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch candidates";
      })
      // תוסיפי כאן את הטיפול ב־fetchMyCandidate thunk
      .addCase(fetchMyCandidate.fulfilled, (state, action: PayloadAction<CandidateDto>) => {
        state.currentCandidate = action.payload;
        state.loading = false;
      })
      .addCase(fetchMyCandidate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch current candidate";
      })
      .addCase(createCandidate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCandidate.fulfilled, (state, action: PayloadAction<CandidateDto>) => {
        state.loading = false;
        // מוסיף את המועמד החדש למערך הקיים
        state.candidates.push(action.payload);
        // אופציונלי: להגדיר אותו כמועמד נוכחי
        state.currentCandidate = action.payload;
      })
      .addCase(createCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || action.error.message || "Failed to create candidate";
      });

    // המשך הטיפול ביצירת מועמד, מחיקה, עדכון כמו שיש לך...
  },
});

export const { clearCandidates } = candidateSlice.actions;
export default candidateSlice.reducer;
