//src/features/cards/Card.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import visaLogo from "../../assets/logo/visa.svg";
import mastercardLogo from "../../assets/logo/mastercard.svg";
import amexLogo from "../../assets/logo/amex.svg";
import maestroLogo from "../../assets/logo/maestro.svg";
import styles from "../../styles/Card.module.css"; // Імпорт стилів

const Card = ({ card }) => {
  const navigate = useNavigate();

  const getLogo = (vendor) => {
    switch (vendor) {
      case "visa":
        return visaLogo;
      case "mastercard":
        return mastercardLogo;
      case "amex":
        return amexLogo;
      case "maestro":
        return maestroLogo;
      default:
        return null;
    }
  };

  const getCardStyle = () => {
    switch (card.vendor) {
      case "visa":
        return { backgroundColor: "#1d92ea", color: "white" };
      case "mastercard":
        return { backgroundColor: "#bd7b83", color: "white" };
      case "amex":
        return { backgroundColor: "#bf8952", color: "white" };
      case "maestro":
        return { backgroundColor: "#b275ce", color: "white" };
      default:
        return { backgroundColor: "#CCCCCC" };
    }
  };

  const handleCardClick = () => {
    navigate(`/card/${card.id}`);
  };

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
      <p>cvv: ***</p>
      {/* <button  onClick={handleToggleActive}>
        {card.isActive ? "Deactivate" : "Activate"}
      </button> */}
      <div className={styles.cardLogoContainer}>
        {getLogo(card.vendor) && (
          <img
            src={getLogo(card.vendor)}
            alt={`${card.vendor} logo`}
            className={styles.cardLogo}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
