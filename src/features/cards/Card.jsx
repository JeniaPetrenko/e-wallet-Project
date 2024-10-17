//src/features/cards/Card.jsx
import React from "react";
import { useDispatch } from "react-redux";
import { setActiveCard } from "../../redux/cardsSlice";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Card.module.css"; // Імпорт стилів

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
        return { backgroundColor: "#CCCCCC" };
    }
  };

  const handleCardClick = () => {
    navigate(`/card/${card.id}`);
  };

  // const handleToggleActive = () => {
  //   dispatch(setActiveCard(card.id));
  // };

  return (
    <div
      className={`${styles.cardContainer} ${
        card.isActive ? styles.activeCard : ""
      }`}
      style={getCardStyle()}
      onClick={handleCardClick}
    >
      <h3>{card.vendor}</h3>
      <p>Card Number: **** **** **** {card.cardNumber.slice(-4)}</p>
      <p>Cardholder: {card.cardholderName}</p>
      <p>
        Expire: {card.expireMonth}/{card.expireYear}
      </p>
      {/* <button onClick={handleToggleActive}>
        {card.isActive ? "Deactivate" : "Activate"}
      </button> */}
    </div>
  );
};

export default Card;
