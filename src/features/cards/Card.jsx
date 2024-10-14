//src/features/cards/Card.jsx
// Коментар: Card компонент для відображення окремої картки з можливістю активації та видалення

import React from "react";
import { useDispatch } from "react-redux";
import { removeCard, setActiveCard } from "../../redux/cardsSlice";

const Card = ({ card }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={`card ${card.isActive ? "active" : ""}`}
      style={{ backgroundColor: card.color }}
    >
      <h3>{card.vendor}</h3>
      <p>Card Number: **** **** **** {card.cardNumber.slice(-4)}</p>
      <p>Cardholder: {card.cardholder}</p>
      <p>
        Expire: {card.expireMonth}/{card.ixpireYear}
      </p>
      {!card.isActive && (
        <>
          <button onClick={() => dispatch(setActiveCard(card.id))}>
            Set Active
          </button>
          <button onClick={() => dispatch(removeCard(card.id))}>Remove</button>
        </>
      )}
    </div>
  );
};

export default Card;
