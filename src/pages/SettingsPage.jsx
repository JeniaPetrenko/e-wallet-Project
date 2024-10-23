import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../redux/settingsSlice";
import { deleteInactiveCards } from "../redux/cardsSlice";
import commonStyles from "../styles/Common.module.css";

const SettingsPage = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.settings.theme);
  const cards = useSelector((state) => state.cards.cards);
  const inactiveCards = cards.filter((card) => !card.isActive);

  useEffect(() => {
    console.log("Current theme: " + theme);
  }, [theme]);

  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    console.log("Changing theme to: " + newTheme);
    dispatch(setTheme(newTheme));
  };

  const handleDeleteInactiveCards = () => {
    console.log("Deleting all inactive cards");
    dispatch(deleteInactiveCards());
  };

  return (
    <div className={`${commonStyles.pageContainer} theme-${theme}`}>
      <h1 className={commonStyles.pageTitle}>Settings</h1>

      <div>
        <label>Choose Theme:</label>
        <select value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="green">Green</option>
        </select>
      </div>

      <div>
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
