//src/pages/AddCardPage.js
// AddCardPage сторінка для додавання нової картки
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCard } from "../redux/cardsSlice";
import CardForm from "../features/cards/CardForm";
import commonStyles from "../styles/Common.module.css"; // Імпорт спільних стилів

const AddCardPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cards = useSelector((state) => state.cards.cards);

  const handleAddCard = (cardData) => {
    if (cards.length < 4) {
      dispatch(addCard(cardData));
      console.log("The card has been added", cardData);
      navigate("/");
    } else {
      alert("You can't add more than 4 cards.");
      console.log("You can't add more than 4 cards.");
    }
  };

  return (
    <div className={commonStyles.pageContainer}>
      <h2 className={commonStyles.pageTitle}>Add New Card</h2>
      <CardForm
        onSubmit={handleAddCard}
        initialData={{}}
        totalCards={cards.length}
        isEditing={false}
      />
    </div>
  );
};

export default AddCardPage;
