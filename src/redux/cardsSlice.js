//src/redux/cardsSlic.js
// Коментар: cardsSlice містить всю логіку для управління картками в Redux

import { createSlice } from "@reduxjs/toolkit";

const cardsSlice = createSlice({
  name: "cards", //name of the slice
  initialState: {
    cards: [],
  },
  reducers: {
    addCard: (state, action) => {
      if (state.cards.length < 4) {
        state.cards.push({
          ...action.payload,
          id: Date.now(),
          isActive: false,
        });
      }
    },
    removeCard: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
    setActiveCard: (state, action) => {
      state.cards = state.cards.map((card) => ({
        ...card,
        isActive: card.id === action.payload,
      }));
    },
    updateCard: (state, action) => {
      const index = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = { ...state[index], ...action.payload };
      }
    },
  },
});

export const { addCard, removeCard, setActiveCard, updateCard } =
  cardsSlice.actions;

export default cardsSlice.reducer;
