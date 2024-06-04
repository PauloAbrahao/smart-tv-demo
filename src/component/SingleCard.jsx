import React from "react";
import "./SingleCard.css";

export default function SingleCard({ card, handleChoice, flipped, disabled, active }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={`card ${active ? 'active' : ''}`} onClick={handleClick}>
      <div className={`overlay ${active ? 'active' : ''}`}></div>
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src="./img/cover.png" alt="card back" />
      </div>
    </div>
  );
}
