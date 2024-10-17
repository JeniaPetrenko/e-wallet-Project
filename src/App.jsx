// src/App.jsx
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddCardPage from "./pages/AddCardPage";
import CardDetailsPage from "./pages/CardDetailsPage";
import SettingsPage from "./pages/SettingsPage";
import Header from "./components/Header"; // Імпортуємо Header компонент
import "./styles/themes.css";

function App() {
  const theme = useSelector((state) => state.settings.theme);

  useEffect(() => {
    document.documentElement.className = `theme-${theme}`; // Додаємо активну тему у документ
  }, [theme]);

  return (
    <div className={`App theme-${theme}`}>
      {" "}
      {/* Додаємо клас теми */}
      <Router>
        <Header /> {/* Вставляємо компонент Header */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-card" element={<AddCardPage />} />
          <Route path="/card/:id" element={<CardDetailsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Router>{" "}
    </div>
  );
}

export default App;

// Аналіз:
// 1. Імпорти коректні, включаючи BrowserRouter (як Router), Route, Routes, та Link.
// 2. Імпорти компонентів сторінок правильні.
// 3. Структура компонента App правильна, використовує Router як кореневий елемент.
// 4. Навігаційне меню створено коректно з використанням компонентів Link.
// 5. Маршрути визначені правильно всередині компонента Routes.
// 6. Шляхи та відповідні компоненти для кожного маршруту вказані коректно.
// 7. Динамічний маршрут для деталей картки (/card/:id) реалізований правильно.
