//src/features/cards/Card.jsx
// Коментар: Card компонент для відображення окремої картки з можливістю активації та видалення

import React from "react";
import { useDispatch } from "react-redux";
import { removeCard, setActiveCard } from "../../redux/cardsSlice";
import { useNavigate } from "react-router-dom";

const Card = ({ card }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCardStyle = () => {
    switch (card.vendor) {
      case "visa":
        return { backgroundColor: "#1A1F71", color: "white" };
      case "mastercard":
        return { backgroundColor: "#EB001B", color: "white" };
      case "amex":
        return { backgroundColor: "#006FCF", color: "white" };
      default:
        return { backgroundColor: "#CCCCCC", color: "black" };
    }
  };

  const handleCardClick = () => {
    navigate(`/card/${card.id}`);
  };
  return (
    <div
      className={`card ${card.isActive ? "active" : ""}`}
      style={getCardStyle()}
      onClick={handleCardClick}
    >
      <h3>{card.vendor}</h3>
      <p>Card Number: **** **** **** {card.cardNumber.slice(-4)}</p>
      <p>Cardholder: {card.cardholderName}</p>
      <p>
        Expire: {card.expireMonth}/{card.expireYear}
      </p>
      {!card.isActive && (
        <div onClick={(e) => e.stopPropagation()}>
          <button onClick={() => dispatch(setActiveCard(card.id))}>
            Set Active
          </button>
          <button onClick={() => dispatch(removeCard(card.id))}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default Card;
