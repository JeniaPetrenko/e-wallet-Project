//src/utils/validator.js
// Коментар: validation.js містить функції для валідації даних картки
export const validateCardNumber = (cardNumber) => {
  return /^[0-9]{16}$/.test(cardNumber);
};

export const validateExpiryDate = (month, year) => {
  const currentYear = new Date();
  const expiryDate = new Date(year, month - 1);
  return expiryDate > currentDate;
};

export const validateCardholderName = (cardholderName) => {
  return /^[A-Za-z\s]+$/.test(cardholderName);
};
