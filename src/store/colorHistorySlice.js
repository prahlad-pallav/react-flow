// colorHistorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  colorHistory: [],
  historyIndex: -1,
};

const colorHistorySlice = createSlice({
  name: 'colorHistory',
  initialState,
  reducers: {
    addColorToHistory: (state, action) => {
      // Add the new color to the history, slicing off anything past the current index
      state.colorHistory = [...state.colorHistory.slice(0, state.historyIndex + 1), action.payload];
      state.historyIndex += 1;
    },
    undoColor: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
      }
    },
    redoColor: (state) => {
      if (state.historyIndex < state.colorHistory.length - 1) {
        state.historyIndex += 1;
      }
    },
    resetColorHistory: (state) => {
      state.colorHistory = [];
      state.historyIndex = -1;
    },
  },
});

export const { addColorToHistory, undoColor, redoColor, resetColorHistory } = colorHistorySlice.actions;

export default colorHistorySlice.reducer;
