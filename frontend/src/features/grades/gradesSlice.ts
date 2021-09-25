import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { gradesResponse } from '../../types';

interface GradesState {
  loaded: boolean;
  grades: gradesResponse;
}

const initialState: GradesState = {
  loaded: false,
  grades: {},
};

export const gradesSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {
    resetGrades: (state) => {
      state.grades = {};
      state.loaded = false;
    },
    setGrades: (state, action: PayloadAction<gradesResponse>) => {
      state.grades = action.payload;
    },
    setGradesLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
});

export const { resetGrades, setGrades, setGradesLoaded } = gradesSlice.actions;

export const selectGradesLoaded = (state: RootState): boolean =>
  state.grades.loaded;
export const selectGrades = (state: RootState): gradesResponse =>
  state.grades.grades;

export default gradesSlice.reducer;
