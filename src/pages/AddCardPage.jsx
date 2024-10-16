//src/pages/AddCardPage.js
// Коментар: AddCardPage дозволяє додавати нову картку

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCard } from "../redux/cardsSlice";
import CardForm from "../features/cards/CardForm";

const AddCardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cards = useSelector((state) => state.cards.cards); //number of existing cards

  const handleAddCard = (cardData) => {
    // Check if the user can add a new card
    if (cards.length < 4) {
      //dispatch the addCard action only if the conditions is satisfied
      dispatch(addCard(cardData));
      console.log("The card has been added", cardData);
      navigate("/"); // Redirect to the Cards page after adding a card
    } else {
      console.log("You can't add more than 4 cards.");
    }
  };

  return (
    <div>
      <h1>Add New Card</h1>
      <CardForm
        onSubmit={handleAddCard}
        initialData={{}}
        totalCards={cards.length}
        isEditing={false}
      />
      {""}
    </div>
  );
};
export default AddCardPage;
