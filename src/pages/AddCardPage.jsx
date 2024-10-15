//src/pages/AddCardPage.js
// Коментар: AddCardPage дозволяє додавати нову картку

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCard } from "../redux/cardsSlice";
import CardForm from "../features/cards/CardForm";

const AddCardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddCard = (card) => {
    dispatch(addCard(card));
    navigate("/");
  };

  return (
    <div>
      <h1>Add New Card</h1>
      <CardForm onSubmit={handleAddCard} />
    </div>
  );
};
export default AddCardPage;
