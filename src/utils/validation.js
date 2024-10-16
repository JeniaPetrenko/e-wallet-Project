// src/utils/validator.js
// src/utils/validation.js

export const validateCardNumber = (cardNumber) => {
  return /^\d{16}$/.test(cardNumber); // Перевірка на 16 цифр
};

export const validateExpiryDate = (month, year) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const expMonth = parseInt(month, 10);
  let expYear = parseInt(year, 10);

  // Привести рік у формат повного року
  if (expYear < 100) {
    expYear += expYear >= currentYear % 100 ? 2000 : 1900;
  }

  // Перевірка на майбутню дату
  if (
    expYear < currentYear ||
    (expYear === currentYear && expMonth < currentMonth)
  ) {
    return false;
  }

  return expMonth >= 1 && expMonth <= 12;
};

export const validateCardholderName = (cardholderName) => {
  return /^[A-Za-z\s'-]+$/.test(cardholderName); // Без цифр
};

export const validateCVV = (cvv) => {
  return /^\d{3,4}$/.test(cvv); // 3 або 4 цифри
};
