//src/redux/cardsSlic.js
// cardsSlice містить всю логіку для управління картками
// в Redux(додавання,видалення, активація, оновлення)

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
    setActiveCard: (state, action) => {
      const cardToToggle = state.cards.find(
        (card) => card.id === action.payload
      );
      if (cardToToggle) {
        // Якщо картка вже активна, деактивуємо її
        if (cardToToggle.isActive) {
          cardToToggle.isActive = false;
        } else {
          // Якщо картка неактивна, деактивуємо всі інші картки і активуємо цю
          state.cards.forEach((card) => {
            card.isActive = card.id === action.payload;
          });
        }
      }
    },
    updateCard: (state, action) => {
      const index = state.cards.findIndex(
        (card) => card.id === action.payload.id
      );
      if (index !== -1) {
        state.cards[index] = { ...state.cards[index], ...action.payload };
      }
    },
    deleteInactiveCards: (state) => {
      state.cards = state.cards.filter((card) => card.isActive);
    },
    deleteCard: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload);
    },
  },
});

export const {
  addCard,
  setActiveCard,
  updateCard,
  deleteInactiveCards,
  deleteCard,
} = cardsSlice.actions;

export default cardsSlice.reducer;
