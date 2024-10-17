//src/pages/CardDetailsPage.jsx
// CardDetailsPage відображає деталі картки,
// дозволяє її редагуват  або видалити
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { setActiveCard, updateCard } from "../redux/cardsSlice";
import CardForm from "../features/cards/CardForm";
import CardPreview from "../features/cards/CardPreview";

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

  return (
    <div>
      <h2>Card Details</h2>
      <div>
        <button onClick={handleToggleActive}>
          {card.isActive ? "Deactivate Card" : "Activate Card"}
        </button>
      </div>

      {!isEditing ? (
        <CardPreview cardData={card} />
      ) : (
        <CardForm initialData={card} onSubmit={handleUpdate} />
      )}
      {!card.isActive && (
        <div>
          {!isEditing && <button onClick={handleEdit}>Edit Card</button>}

          <button onClick={() => dispatch(setActiveCard(card.id))}>
            Delete Card
          </button>
        </div>
      )}
      {card.isActive && <p>This card is active. Editing is not allowed.</p>}
    </div>
  );
};

export default CardDetailsPage;
