//src/pages/CardDetailsPage.jsx
// CardDetailsPage відображає деталі картки,
// дозволяє її редагуват  або видалити
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setActiveCard, updateCard, deleteCard } from "../redux/cardsSlice";
import CardForm from "../features/cards/CardForm";
import CardPreview from "../features/cards/CardPreview";
import commonStyles from "../styles/Common.module.css"; // Імпорт спільних стилів

const CardDetailsPage = () => {
  const { id } = useParams();
  const card = useSelector((state) =>
    state.cards.cards.find((c) => c.id === parseInt(id))
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  if (!card) {
    return <h1>Card not found</h1>;
  }

  const handleToggleActive = () => {
    dispatch(setActiveCard(card.id));
  };

  const handleUpdate = (updatedData) => {
    dispatch(updateCard({ id: card.id, ...updatedData }));
    setIsEditing(false);
  };

  const handleEdit = () => {
    if (!card.isActive) {
      setIsEditing(true);
    }
  };
  const handleCancelEdit = () => {
    setIsEditing(false); // Повернення до режиму перегляду без збереження
  };
  const handleDelete = () => {
    dispatch(deleteCard(card.id));
    navigate("/"); // Переходимо на головну сторінку після видалення
  };

  return (
    <div className={commonStyles.pageContainer}>
      <h2 className={commonStyles.pageTitle}>Card Details</h2>
      <div>
        <button onClick={handleToggleActive}>
          {card.isActive ? "Deactivate Card" : "Activate Card"}
        </button>
      </div>

      {!isEditing ? (
        <CardPreview cardData={card} />
      ) : (
        <div>
          <p>Editing card...</p> {/* Повідомлення про редагування */}
          <CardForm
            initialData={card}
            onSubmit={handleUpdate}
            isEditing={true}
          />
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}

      {!card.isActive && (
        <div>
          {!isEditing && <button onClick={handleEdit}>Edit Card</button>}

          <button onClick={handleDelete}>Delete Card</button>
        </div>
      )}
      {card.isActive && <p>This card is active. Editing is not allowed.</p>}
    </div>
  );
};

export default CardDetailsPage;
