// src/features/cards/CardForm.jsx
// Коментар: CardForm компонент для додавання та редагування карток з валідацією
import React from "react";
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
      newErrors.expire = "Invalid expire year";
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
        id=""
        value={cardData.vendor}
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
        value={cardData.cardNumber}
        onChange={handleChange}
        placeholder="Cardholder Number"
        id=""
      />
      <input
        type="text"
        name="cardholderName"
        value={cardData.cardholderName}
        onChange={handleChange}
        placeholder="Cardholder Name"
        id=""
      />
      <input
        type="text"
        name="cardNumber"
        value={cardData.cardNumber}
        onChange={handleChange}
        placeholder="Cardholder Name"
        id=""
      />
      <input
        type="text"
        name="expireMonth"
        value={cardData.expireMonth}
        onChange={handleChange}
        placeholder="Expiry Month"
        id=""
      />
      <input
        type="text"
        name="expireYear"
        value={cardData.expireYear}
        onChange={handleChange}
        placeholder="Expiry Year"
        id=""
      />
      <input
        type="text"
        name="cardNumber"
        value={cardData.cardNumber}
        onChange={handleChange}
        placeholder="Cardholder Name"
        id=""
      />
      <input
        type="text"
        name="cvv"
        value={cardData.cvv}
        onChange={handleChange}
        placeholder="CVV"
        id=""
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
