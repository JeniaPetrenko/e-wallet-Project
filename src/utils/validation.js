// src/utils/validator.js

export const validateCardNumber = (cardNumber) => {
  // Базова перевірка на 16 цифр
  return /^[0-9]{16}$/.test(cardNumber);

  // Алгоритм Луна
  let sum = 0;
  let isEven = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }

  console.log("Luhn validation result: ", sum % 10 === 0);
  return sum % 10 === 0;
};

export const validateExpiryDate = (month, year) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const expMonth = parseInt(month, 10);
  const expYear = parseInt(year, 10);
  if (isNaN(expMonth) || isNaN(expYear)) {
    return false;
  }
  if (expYear < currentYear || expYear > currentYear + 10) {
    return false;
  }
  // If it's the current year, check if the month is valid
  if (expYear === currentYear && expMonth < currentMonth) {
    return false;
  }
  // Check if month is between 1 and 12
  if (expMonth < 1 || expMonth > 12) {
    return false;
  }
  return true;
};

export const validateCardholderName = (cardholderName) => {
  return /^[A-Za-zА-Яа-я\s'-]+$/.test(cardholderName);
};

export const validateCVV = (cvv) => {
  return /^[0-9]{3,4}$/.test(cvv);
};
