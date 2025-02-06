// src/store/fontSizeHistorySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fontSizeHistory: [],
  historyIndex: -1,
};

const fontSizeHistorySlice = createSlice({
  name: 'fontSizeHistory',
  initialState,
  reducers: {
    setFontSizeHistory: (state, action) => {
      state.fontSizeHistory = action.payload;
    },
    setHistoryIndex: (state, action) => {
      state.historyIndex = action.payload;
    },
    addFontSizeToHistory: (state, action) => {
      const newFontSize = action.payload;
      const updatedHistory = state.fontSizeHistory.slice(0, state.historyIndex + 1);
      state.fontSizeHistory = [...updatedHistory, newFontSize];
      state.historyIndex = state.historyIndex + 1;
    },
    undoFontSize: (state) => {
      if (state.historyIndex > 0) {
        state.historyIndex -= 1;
      }
    },
    redoFontSize: (state) => {
      if (state.historyIndex < state.fontSizeHistory.length - 1) {
        state.historyIndex += 1;
      }
    },
  },
});

export const {
  setFontSizeHistory,
  setHistoryIndex,
  addFontSizeToHistory,
  undoFontSize,
  redoFontSize,
} = fontSizeHistorySlice.actions;

export default fontSizeHistorySlice.reducer;
