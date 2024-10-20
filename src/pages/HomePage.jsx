// src/pages/HomePage.jsx

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../features/cards/Card";
import CardList from "../features/cards/CardList";
import commonStyles from "../styles/Common.module.css"; // Імпорт нових спільних стилів

const HomePage = () => {
  const cards = useSelector((state) => state.cards.cards);
  const activeCard = cards.find((card) => card.isActive);
  const totalCards = cards.length;

  useEffect(() => {
    document.body.classList.add("home-page");

    return () => {
      document.body.classList.remove("home-page");
    };
  }, []);

  return (
    <div className={commonStyles.pageContainer}>
      <h2 className={commonStyles.pageTitle}>My E-Wallet</h2>
      <p>Active Card</p>

      {activeCard ? (
        <Card card={activeCard} />
      ) : (
        <p>No active card selected.</p>
      )}
      <p>Inactive Cards</p>
      <CardList cards={cards.filter((card) => !card.isActive)} />

      {totalCards < 4 ? (
        <Link to="/add-card">
          <button className={commonStyles.button}>Add New Card</button>
        </Link>
      ) : (
        <p>You can't add more than 4 cards.</p>
      )}
    </div>
  );
};

export default HomePage;
