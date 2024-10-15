//src/pages/HomePage.jsx
// Коментар: HomePage відображає активну картку, список
// неактивних карток та кнопку додавання нової картки

// src/pages/HomePage.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../features/cards/Card";
import CardList from "../features/cards/CardList";

const HomePage = () => {
  const cards = useSelector((state) => state.cards);
  const activeCard = cards.find((card) => card.isActive);

  return (
    <div>
      <h1>My E-Wallet</h1>
      {activeCard && <Card card={activeCard} />}
      <CardList cards={cards.filter((card) => !card.isActive)} />
      {cards.length < 4 && (
        <Link to="/add-card">
          <button>Add New Card</button>
        </Link>
      )}
    </div>
  );
};

export default HomePage;