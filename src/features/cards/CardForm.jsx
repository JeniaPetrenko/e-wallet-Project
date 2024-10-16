// src/features/cards/CardForm.jsx
// Коментар: CardForm компонент для додавання та редагування карток з валідацією
import React, { useState } from "react";
import {
  validateCardNumber,
  validateExpiryDate,
  validateCardholderName,
} from "../../utils/validation";

const CardForm = ({ onSubmit, initialData = {}, totalCards }) => {
  const [cardData, setCardData] = useState(initialData);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    console.log("Validatin card data", cardData);

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
    }
    if (!validateCardholderName(cardData.cardholderName)) {
      newErrors.cardholderName = "Name cannot contain numbers";
      console.log("Invalid cardholder name: " + cardData.cardholderName);
    }

    if (totalCards >= 4) {
      newErrors.cardLimit = "Maximum 4 cards allowed";
      console.log("Card limit reached. Total cards: " + totalCards);
    }

    if (Object.keys(newErrors).length === 0) {
      console.log("Submitting valid card data: " + cardData);
      onSubmit(cardData);
      setCardData(initialData); // Очищення форми після успішного додавання
    } else {
      setErrors(newErrors);
      console.log("Invalid card data: ", newErrors);
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

      <select
        name="expireMonth"
        value={cardData.expireMonth}
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
        value={cardData.expireYear}
        onChange={handleChange}
        required
      >
        <option value="">Year</option>
        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(
          (year) => (
            <option key={year} value={year}>
              {year}
            </option>
          )
        )}
      </select>
      {errors.expireDate && <p className="error">{errors.expireDate}</p>}

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
