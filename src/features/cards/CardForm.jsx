// src/features/cards/CardForm.jsx
// Коментар: CardForm компонент для додавання та редагування карток з валідацією
//номер, імʼя, etc
import React, { useState, useEffect } from "react";
import {
  validateCardNumber,
  validateExpiryDate,
  validateCardholderName,
} from "../../utils/validation";
import styles from "../../styles/CardForm.module.css";

const CardForm = ({
  onSubmit,
  initialData = {},
  totalCards,
  isEditing = false,
}) => {
  const [cardData, setCardData] = useState(initialData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      setCardData(initialData);
    }
  }, [isEditing, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    console.log("Validating card data", cardData);

    if (!validateCardNumber(cardData.cardNumber)) {
      newErrors.cardNumber = "Invalid card number";
      console.log("Invalid card number: " + cardData.cardNumber);
    }

    if (!validateExpiryDate(cardData.expireMonth, cardData.expireYear)) {
      newErrors.expire = "The expiry date must be in the future";
      console.log(
        "Invalid expiry date: " +
          cardData.expireMonth +
          "/" +
          cardData.expireYear
      );
    }

    if (!validateCardholderName(cardData.cardholderName)) {
      newErrors.cardholderName = "Invalid cardholder name";
      console.log("Invalid cardholder name: " + cardData.cardholderName);
    }

    if (totalCards >= 4 && !isEditing) {
      newErrors.cardLimit = "Maximum 4 cards allowed";
      console.log("Card limit reached. Total cards: " + totalCards);
    }

    if (Object.keys(newErrors).length === 0) {
      console.log("Submitting valid card data: ", cardData);
      onSubmit(cardData);
      if (!isEditing) {
        setCardData(initialData); // Очищення форми після успішного додавання
      }
    } else {
      setErrors(newErrors);
      console.log("Invalid card data: ", newErrors);
    }
  };

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
    <div>
      <div className={styles.cardPreview} style={getCardStyle()}>
        <h3>{cardData.vendor || "Card Vendor"}</h3>
        <p>
          {cardData.cardNumber
            ? `**** **** **** ${cardData.cardNumber.slice(-4)}`
            : "**** **** **** ****"}
        </p>
        <p>{cardData.cardholderName || "Cardholder Name"}</p>
        <p>{`${cardData.expireMonth || "MM"}/${
          cardData.expireYear || "YY"
        }`}</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <select
          name="vendor"
          value={cardData.vendor || ""}
          onChange={handleChange}
          required
        >
          <option value="">Select vendor</option>
          <option value="visa">Visa</option>
          <option value="mastercard">Mastercard</option>
          <option value="amex">American Express</option>
        </select>
        {errors.vendor && <p className={styles.error}>{errors.vendor}</p>}

        <input
          type="text"
          name="cardNumber"
          value={cardData.cardNumber || ""}
          onChange={handleChange}
          placeholder="Card Number"
          maxLength="16"
          required
        />
        {errors.cardNumber && (
          <p className={styles.error}>{errors.cardNumber}</p>
        )}

        <input
          type="text"
          name="cardholderName"
          value={cardData.cardholderName || ""}
          onChange={handleChange}
          placeholder="Cardholder Name"
          required
        />
        {errors.cardholderName && (
          <p className={styles.error}>{errors.cardholderName}</p>
        )}

        <select
          name="expireMonth"
          value={cardData.expireMonth || ""}
          onChange={handleChange}
          required
        >
          <option value="">Month</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
            <option key={month} value={month.toString().padStart(2, "0")}>
              {month.toString().padStart(2, "0")}
            </option>
          ))}
        </select>

        <select
          name="expireYear"
          value={cardData.expireYear || ""}
          onChange={handleChange}
          required
        >
          <option value="">Year</option>
          {Array.from(
            { length: 10 },
            (_, i) => new Date().getFullYear() + i
          ).map((year) => (
            <option key={year} value={year.toString().slice(-2)}>
              {year}
            </option>
          ))}
        </select>
        {errors.expire && <p className={styles.error}>{errors.expire}</p>}

        <input
          type="text"
          name="cvv"
          value={cardData.cvv || ""}
          onChange={handleChange}
          placeholder="CVV"
          maxLength="3"
          required
        />
        {errors.cvv && <p className={styles.error}>{errors.cvv}</p>}

        <button type="submit">{isEditing ? "Update Card" : "Add Card"}</button>
      </form>
    </div>
  );
};

export default CardForm;

// Виправлення та зауваження:
// 1. Видалено дублікати полів вводу для cardNumber.
// 2. Виправлено placeholder для поля cardNumber.
// 3. Додано || "" для всіх value атрибутів, щоб уникнути помилок з undefined.
// 4. Змінено повідомлення про помилку для expiry date.
// 5. Видалено непотрібні id атрибути з input полів
