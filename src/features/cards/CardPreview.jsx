// src/features/cards/CardPreview.jsx
import React from "react";
import styles from "../../styles/CardForm.module.css";

const CardPreview = ({ cardData }) => {
  const getCardStyle = () => {
    switch (cardData.vendor) {
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
    </div>
  );
};

export default CardPreview;
