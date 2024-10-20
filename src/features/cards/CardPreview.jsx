// src/features/cards/CardPreview.jsx
import React from "react";
import styles from "../../styles/CardForm.module.css";

const CardPreview = ({ cardData }) => {
  const getCardStyle = () => {
    switch (cardData.vendor) {
      case "visa":
        return { backgroundColor: "#1d92ea", color: "white" };
      case "mastercard":
        return { backgroundColor: "#bd7b83", color: "white" };
      case "amex":
        return { backgroundColor: "#bf8952", color: "white" };
      case "maestro":
        return { backgroundColor: "#b275ce", color: "white" };
      case "discover":
      default:
        return { backgroundColor: "#CCCCCC", color: "black" };
    }
  };

  return (
    <div className={styles.cardPreview} style={getCardStyle()}>
      <h3>{cardData.vendor || "Card Vendor"}</h3>
      <p>
        {cardData.cardNumber
          ? `**** **** **** ${cardData.cardNumber.slice(-4)}`
          : "**** **** **** ****"}
      </p>
      <p>{cardData.cardholderName || "Cardholder Name"}</p>
      <p>{`${cardData.expireMonth || "MM"}/${cardData.expireYear || "YY"}`}</p>
      <p>{cardData.cvv || "cvv"}</p>
    </div>
  );
};

export default CardPreview;
