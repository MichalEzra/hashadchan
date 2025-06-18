import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Candidate } from "../../types/candidate.types";
import { fetchCandidates, createCandidate } from "../thunks/candidates.thunks";

interface CandidatesState {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
}

const initialState: CandidatesState = {
  candidates: [],
  loading: false,
  error: null,
};

const candidateSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    clearCandidates: (state) => {
      state.candidates = [];
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCandidates.fulfilled, (state, action: PayloadAction<Candidate[]>) => {
        console.log("✅ קיבלנו את המועמדים:", action.payload);
        state.loading = false;
        state.candidates = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch candidates";
      })
      .addCase(createCandidate.fulfilled, (state, action: PayloadAction<Candidate>) => {
        state.candidates.push(action.payload);
      });
  },
});

export const { clearCandidates } = candidateSlice.actions;
export default candidateSlice.reducer;
