// src/redux/settingsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    deleteInactiveCards: (state, action) => {},
  },
});

export const { setTheme, deleteInactiveCards } = settingsSlice.actions;

export default settingsSlice.reducer;
