// src/pages/HomePage.jsx

import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../features/cards/Card";
import CardList from "../features/cards/CardList";
import styles from "../styles/HomePage.module.css"; // Імпорт стилів

const HomePage = () => {
  const cards = useSelector((state) => state.cards.cards);
  const activeCard = cards.find((card) => card.isActive);
  const totalCards = cards.length;

  return (
    <div className={styles.homeCardContainer}>
      <h1 className={styles.homeTitle}>My E-Wallet</h1>
      <p>Active Card</p>

      {/* Відображення активної картки */}
      {activeCard ? (
        <Card card={activeCard} />
      ) : (
        <p className={styles.noCardsMessage}>No active card selected.</p>
      )}
      <p>Inactive Cards</p>

      {/* Відображення неактивних карток */}
      <CardList cards={cards.filter((card) => !card.isActive)} />

      {/* Кнопка для додавання нової картки */}
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
