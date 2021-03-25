import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setUpdate(state) {
      return !state;
    },
  },
});

export const { setUpdate } = gameSlice.actions;

export default gameSlice.reducer;
