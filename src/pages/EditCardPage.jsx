// src/pages/EditCardPage.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateCard } from "../redux/cardsSlice"; // Дія для оновлення картки
import CardForm from "../features/cards/CardForm";
import commonStyles from "../styles/Common.module.css"; // Імпорт спільних стилів

const EditCardPage = () => {
  const { id } = useParams(); // Отримуємо ID картки з URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Знаходимо картку по її ID
  const card = useSelector((state) =>
    state.cards.cards.find((c) => c.id === id)
  );

  // Обробник збереження змін
  const handleSubmit = (updatedCard) => {
    dispatch(updateCard({ id, ...updatedCard })); // Оновлюємо картку
    navigate("/"); // Переходимо на головну сторінку після збереження
  };

  if (!card) {
    return <p>Card not found</p>;
  }

  return (
    <div className={commonStyles}>
      <h2>Edit Card</h2>
      <CardForm
        onSubmit={handleSubmit} // Передаємо обробник для збереження змін
        initialData={card} // Передаємо існуючі дані картки
        isEditing={true} // Вказуємо, що це редагування
      />
    </div>
  );
};

export default EditCardPage;
