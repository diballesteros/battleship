import { createSlice } from '@reduxjs/toolkit';
import { INITIAL_STATE } from 'constants/constant';

export const gameSlice = createSlice({
  name: 'game',
  initialState: INITIAL_STATE,
  reducers: {
    setUpdate(state) {
      return state;
    },
  },
});

export const { setUpdate } = gameSlice.actions;

export default gameSlice.reducer;
