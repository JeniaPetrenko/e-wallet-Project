//src/pages/SettingsPags.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../redux/settingsSlice"; // Імпортуємо тільки зміну теми
import { deleteInactiveCards } from "../redux/cardsSlice"; // ��мпортуємо зміну всіх картокmport { dele } from "../redux/cardsSlice"; // ��мпортуємо зміну всіх карток
import styles from "../styles/SettingsPage.module.css"; // Імпортуємо стилі

const SettingsPage = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.settings.theme); // Отримуємо поточну тему з Redux
  const cards = useSelector((state) => state.cards.cards); // Отримуємо всі картки
  const inactiveCards = cards.filter((card) => !card.isActive); // Отримуємо всі неактивні картки

  useEffect(() => {
    console.log("Current theme: " + theme);
  }, [theme]);

  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    console.log("Changing theme to: " + newTheme); // Виводимо нову тему у консольку
    dispatch(setTheme(newTheme)); // Зміна теми
  };

  const handleDeleteInactiveCards = () => {
    console.log("Deleting all inactive cards"); // Виводимо повідомлення у консоль
    dispatch(deleteInactiveCards()); // Використовуємо перейменовану дію для видалення карток
  };

  return (
    <div className={`${styles.settingsContainer} theme-${theme}`}>
      <h1 className={styles.settingsTitle}>Settings</h1>

      <div className={styles.themeSelector}>
        <label>Choose Theme:</label>
        <select value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="green">Green</option>
        </select>
      </div>

      <div className={styles.inactiveCards}>
        <h2>Inactive Cards</h2>
        {inactiveCards.length > 0 ? (
          <button onClick={handleDeleteInactiveCards}>
            Delete All Inactive Cards
          </button>
        ) : (
          <p>No inactive cards to delete.</p>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
