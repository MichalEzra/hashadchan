// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authReducer from './auth/auth.slice';
import candidateReducer from './slice/candidateSlice';
import userReducer from '../redux/slice/userSlice'; // ✅ הוספנו את זה
import matchmakerReducer from './slice/matchmakerSlice'; // ✅ הוספנו את זה
import matchReducer from './slice/matchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    candidates: candidateReducer, // ✅ הוספנו את זה
    users: userReducer, // ✅ הוספנו את זה
    matchmakers: matchmakerReducer, // ✅ הוספנו את זה
    matches: matchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
}
);
console.log("STATE עכשיו:", store.getState());


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;