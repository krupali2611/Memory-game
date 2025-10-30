import React from "react";
import "./Card.css";

export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={`card-inner ${flipped ? "flipped" : ""}`}>
        <div className="card-front">
          {card.src}
        </div>
        <div className="card-back" onClick={handleClick}>
          ❓
        </div>
      </div>
    </div>
  );
}
