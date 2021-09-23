import { configureStore } from '@reduxjs/toolkit';
import gradesSlice from './features/grades/gradesSlice';

export const store = configureStore({
  reducer: {grades: gradesSlice},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
