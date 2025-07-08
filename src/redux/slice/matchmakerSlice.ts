import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Matchmaker } from "../../types/matchmaker.types";
import { createMatchmakerThunk, fetchMatchmakers } from "../thunks/matchmaker.thunks";

interface MatchmakerState {
  matchmakers: Matchmaker[];
  loading: boolean;
  error: string | null;
}

const initialState: MatchmakerState = {
  matchmakers: [],
  loading: false,
  error: null,
};

const candidateSlice = createSlice({
  name: "matchmakers",
  initialState,
  reducers: {
    clearMatchmakers: (state) => {
      state.matchmakers = [];
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatchmakers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatchmakers.fulfilled, (state, action: PayloadAction<Matchmaker[]>) => {
        console.log("✅ קיבלנו את השדכנים:", action.payload);
        state.loading = false;
        state.matchmakers = action.payload;
      })
      .addCase(fetchMatchmakers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch matchmakers";
      })
      .addCase(createMatchmakerThunk.fulfilled, (state, action: PayloadAction<Matchmaker>) => {
        state.matchmakers.push(action.payload);
      });
  },
});

export const { clearMatchmakers } = candidateSlice.actions;
export default candidateSlice.reducer;
