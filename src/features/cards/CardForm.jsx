// src/features/cards/CardForm.jsx
// Коментар: CardForm компонент для додавання та редагування карток з валідацією
import React, { useState } from "react";
import {
  validateCardNumber,
  validateExpiryDate,
  validateCardholderName,
} from "../../utils/validation";

const CardForm = ({ onSubmit, initialData = {} }) => {
  const [cardData, setCardData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!validateCardNumber(cardData.cardNumber)) {
      newErrors.cardNumber = "Invalid card number";
    }
    if (!validateExpiryDate(cardData.expireMonth, cardData.expireYear)) {
      newErrors.expire = "Invalid expire date";
    }
    if (!validateCardholderName(cardData.cardholderName)) {
      newErrors.cardholderName = "Invalid cardholder name";
    }
    if (Object.keys(newErrors).length === 0) {
      onSubmit(cardData);
    } else {
      setErrors(newErrors);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <select
        name="vendor"
        value={cardData.vendor || ""} // Додано || "" для уникнення помилки undefined
        onChange={handleChange}
      >
        <option value="">Select vendor</option>
        <option value="visa">Visa</option>
        <option value="mastercard">Mastercard</option>
        <option value="amex">American Express</option>
      </select>
      <input
        type="text"
        name="cardNumber"
        value={cardData.cardNumber || ""} // Додано || ""
        onChange={handleChange}
        placeholder="Card Number"
      />
      <input
        type="text"
        name="cardholderName"
        value={cardData.cardholderName || ""} // Додано || ""
        onChange={handleChange}
        placeholder="Cardholder Name"
      />

      <input
        type="text"
        name="expireMonth"
        value={cardData.expireMonth || ""} // Додано || ""
        onChange={handleChange}
        placeholder="Expiry Month"
      />
      <input
        type="text"
        name="expireYear"
        value={cardData.expireYear || ""} // Додано || ""
        onChange={handleChange}
        placeholder="Expiry Year"
      />

      <input
        type="text"
        name="cvv"
        value={cardData.cvv || ""} // Додано || ""
        onChange={handleChange}
        placeholder="CVV"
      />
      <button type="submit">Add Card</button>
      {Object.keys(errors).map((key) => (
        <p key={key} style={{ color: "red" }}>
          {errors[key]}
        </p>
      ))}
    </form>
  );
};
export default CardForm;

// Виправлення та зауваження:
// 1. Видалено дублікати полів вводу для cardNumber.
// 2. Виправлено placeholder для поля cardNumber.
// 3. Додано || "" для всіх value атрибутів, щоб уникнути помилок з undefined.
// 4. Змінено повідомлення про помилку для expiry date.
// 5. Видалено непотрібні id атрибути з input полів.
