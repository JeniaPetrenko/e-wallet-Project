//src/redux/store.js
//зберігає стан всіх карток через redux
import { configureStore } from "@reduxjs/toolkit";
import cardsReducer from "./cardsSlice";

export const store = configureStore({
  reducer: {
    cards: cardsReducer,
  },
});
