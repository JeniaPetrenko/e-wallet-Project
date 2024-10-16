//src/pages/CardDetailsPage.jsx
// Коментар: CardDetailsPage відображає деталі картки, дозволяє її редагувати, активувати або видалити
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { removeCard, setActiveCard, updateCard } from "../redux/cardsSlice";
import CardForm from "../features/cards/CardForm";

const CardDetailsPage = () => {
  const { id } = useParams();
  const card = useSelector((state) =>
    state.cards.cards.find((c) => c.id === parseInt(id))
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!card) {
    return <h1>Card not found</h1>;
  }
  const handleDelete = () => {
    if (!card.isActive) {
      dispatch(removeCard(card.id));
      navigate("/");
    }
  };

  const handleActivate = () => {
    dispatch(setActiveCard(card.id));
  };
  const handleUpdate = (updatedData) => {
    dispatch(updateCard({ id: card.id, ...updatedData }));
  };
  return (
    <div>
      <h2>Card Details</h2>
      {card.isActive ? (
        <div>
          <p>Card Number: **** **** **** {card.cardNumber.slice(-4)}</p>
          <p>Cardholder: {card.cardholder}</p>
          <p>
            Expiry: {card.expireMonth}/{card.expireYear}
          </p>
        </div>
      ) : (
        <CardForm initialData={card} onSubmit={handleUpdate} />
      )}
      {!card.isActive && (
        <>
          <button onClick={handleActivate}>Activate Card</button>
          <button onClick={handleDelete}>Delete Card</button>
        </>
      )}
    </div>
  );
};

export default CardDetailsPage;
