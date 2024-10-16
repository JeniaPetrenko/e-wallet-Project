//src/pages/HomePage.jsx
// HomePage відображає активну картку, список
// неактивних карток та кнопку додавання нової картки

// src/pages/HomePage.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../features/cards/Card";
import CardList from "../features/cards/CardList";
import styles from "../styles/HomePage.module.css"; // Імпорт стилів

const HomePage = () => {
  const cards = useSelector((state) => state.cards.cards);
  console.log("Current cards in HomePage", cards);
  const activeCard = cards.find((card) => card.isActive);
  const totalCards = cards.length;

  return (
    <div className={styles.homeCardContainer}>
      <h1 className={styles.homeTitle}>My E-Wallet</h1>
      {activeCard ? (
        <Card card={activeCard} />
      ) : (
        <p className={styles.noCardsMessage}>No active card selected.</p>
      )}

      <CardList cards={cards.filter((card) => !card.isActive)} />

      {totalCards < 4 ? (
        <Link to="/add-card">
          <button className={styles.addButton}>Add New Card</button>
        </Link>
      ) : (
        <p className={styles.noCardsMessage}>
          You can't add more than 4 cards.
        </p>
      )}
    </div>
  );
};

export default HomePage;
