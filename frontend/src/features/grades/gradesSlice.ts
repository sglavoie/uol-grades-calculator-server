import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';

interface GradesState {
  loaded: boolean;
}

const initialState: GradesState = {
  loaded: false,
};

export const gradesSlice = createSlice({
  name: 'grades',
  initialState,
  reducers: {
    setGradesLoaded: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
  },
});

export const { setGradesLoaded } = gradesSlice.actions;

export const selectGradesLoaded = (state: RootState): boolean => state.grades.loaded;

export default gradesSlice.reducer;
