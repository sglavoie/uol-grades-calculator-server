import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { gradesPostRequestBody, grades } from '../../types';

interface GradesState {
  loaded: boolean;
  grades: gradesPostRequestBody;
}

const initialState: GradesState = {
  loaded: false,
  grades: { data: {}, options: {} },
};

export const gradesSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {
    resetGrades: (state) => {
      state.grades = { ...initialState.grades };
      state.loaded = false;
    },
    setGradesData: (state, action: PayloadAction<grades>) => {
      state.grades.data = action.payload;
    },
    setGradesLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
});

export const { resetGrades, setGradesData, setGradesLoaded } = gradesSlice.actions;

export const selectGradesLoaded = (state: RootState): boolean =>
  state.grades.loaded;

// Just get the JSON object containing the actual grades
export const selectGradesData = (state: RootState): grades =>
  state.grades.grades.data || {};

// Get JSON object containing grades and additional properties for routes
// that accept custom options
export const selectGrades = (state: RootState): gradesPostRequestBody =>
  state.grades.grades;

export default gradesSlice.reducer;
