import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import fontSizeReducer from './fontSizeSlice';
import colorReducer from './colorSlice';
import fontSizeHistoryReducer from './fontSizeHistorySlice';
import colorHistoryReducer from './colorHistorySlice';

const store = configureStore({
  reducer: {
    fontSize: fontSizeReducer,
    color: colorReducer,
    fontSizeHistory: fontSizeHistoryReducer,
    colorHistory: colorHistoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk),
});

export default store;