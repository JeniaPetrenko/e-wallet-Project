//src/features/cards/CardList.js
//відображання списку всіх карток

import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const CardList = ({ cards }) => {
  const navigate = useNavigate();

  return (
    <div>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => navigate(`/card/${card.id}`)}
        />
      ))}
    </div>
  );
};

export default CardList;
