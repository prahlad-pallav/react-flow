import { createSlice } from "@reduxjs/toolkit";

const fontSizeSlice = createSlice({
  name: "fontSize",
  initialState: {
    size: 16, 
  },
  reducers: {
    setFontSize: (state, action) => {
      state.size = action.payload;
    },
  },
});

export const { setFontSize } = fontSizeSlice.actions;
export default fontSizeSlice.reducer;
