import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INITIAL_DISPLAY_STATE } from 'constants/constant';

export const displaySlice = createSlice({
  name: 'display',
  initialState: INITIAL_DISPLAY_STATE,
  reducers: {
    rotate(state) {
      state.isVertical = !state.isVertical;
    },
    setHeight(state, action: PayloadAction<number>) {
      state.squareHeight = action.payload;
    },
    setWidth(state, action: PayloadAction<number>) {
      state.squareWidth = action.payload;
    },
    handleNext(state) {
      state.previousTab = state.currentTab;
      if (state.currentTab === 4) {
        state.currentTab = 0;
      } else {
        state.currentTab += 1;
      }
    },
    handlePrevious(state) {
      state.previousTab = state.currentTab;
      if (state.currentTab === 0) {
        state.currentTab = 4;
      } else {
        state.currentTab -= 1;
      }
    },
    setCurrentTab(state, action: PayloadAction<number>) {
      state.currentTab = action.payload;
    },
  },
});

export const {
  rotate,
  setHeight,
  setWidth,
  handleNext,
  handlePrevious,
  setCurrentTab,
} = displaySlice.actions;

export default displaySlice.reducer;
