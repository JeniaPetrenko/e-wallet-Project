//src/redux/store.js
//зберігає стан всіх карток через redux
import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./cardsSlice";
import settingsReducer from "./settingsSlice";

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
    settings: settingsReducer,
  },
});
