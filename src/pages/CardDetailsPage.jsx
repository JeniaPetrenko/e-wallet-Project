//src/pages/CardDetailsPage.jsx
// CardDetailsPage відображає деталі картки,
// дозволяє її редагуват  або видалити
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { removeCard, setActiveCard, updateCard } from "../redux/cardsSlice";
import CardForm from "../features/cards/CardForm";

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
  const handleDelete = () => {
    if (!card.isActive) {
      dispatch(removeCard(card.id));
      navigate("/");
    }
  };

  const handleActivate = () => {
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

  const cardStyle = {
    backgroundColor:
      card.vendor === "visa"
        ? "#1A1F71"
        : card.vendor === "mastercard"
        ? "#EB001B"
        : card.vendor === "amex"
        ? "#006FCF"
        : "#CCCCCC",
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  };

  return (
    <div>
      <h2>Card Details</h2>
      {!isEditing ? (
        <div style={cardStyle}>
          <h3>{card.vendor}</h3>
          <p>Card Number: **** **** **** {card.cardNumber.slice(-4)}</p>
          <p>Cardholder: {card.cardholderName}</p>
          <p>
            Expiry: {card.expireMonth}/{card.expireYear}
          </p>
          <p>CVV: ***</p>
        </div>
      ) : (
        <CardForm initialData={card} onSubmit={handleUpdate} />
      )}
      {!card.isActive && (
        <div>
          {!isEditing && <button onClick={handleEdit}>Edit Card</button>}
          <button onClick={handleActivate}>Activate Card</button>
          <button onClick={handleDelete}>Delete Card</button>
        </div>
      )}
      {card.isActive && (
        <p>This card is active. Editing and deletion are not allowed.</p>
      )}
    </div>
  );
};

export default CardDetailsPage;
