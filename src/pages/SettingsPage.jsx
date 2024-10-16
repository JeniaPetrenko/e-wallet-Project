//src/pages/SettingsPags.jsx
import React from "react";
import styles from "../styles/SettingsPage.module.css"; // Імпорт стилів
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../redux/settingsSlice"; // Імпортуємо тільки зміну теми
import { deleteInactiveCards as removeCardsFromRedux } from "../redux/cardsSlice"; // Перейменовуємо імпорт, щоб уникнути конфлікту

const SettingsPage = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.settings.theme); // Отримуємо поточну тему з Redux
  const inactiveCards = useSelector((state) =>
    state.cards.cards.filter((card) => !card.isActive)
  ); // Отримуємо всі неактивні картки

  const handleThemeChange = (event) => {
    dispatch(setTheme(event.target.value)); // Зміна теми
  };

  const handleDeleteInactive = () => {
    dispatch(removeCardsFromRedux()); // Використовуємо перейменовану дію для видалення карток
  };

  return (
    <div className={`settings-page ${theme}`}>
      <h1>Settings</h1>

      <div className="theme-selector">
        <label>Choose Theme:</label>
        <select value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="green">Green</option>
        </select>
      </div>

      <div className="inactive-cards">
        <h2>Inactive Cards</h2>
        {inactiveCards.length > 0 ? (
          <button onClick={handleDeleteInactive}>
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
