import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/game.css";

function CardGrid({ setMatchedPairs, emojis }) {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);

  useEffect(() => {
    const shuffledCards = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false
      }));
    setCards(shuffledCards);
  }, [emojis]);

  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || cards[index].flipped || cards[index].matched) {
      return;
    }

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    setFlippedIndices((prev) => [...prev, index]);
  };

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.emoji === secondCard.emoji) {
        const newCards = [...cards];
        newCards[firstIndex].matched = true;
        newCards[secondIndex].matched = true;
        setCards(newCards);
        setMatchedPairs((prev) => prev + 1);
      } else {
        setTimeout(() => {
          const newCards = [...cards];
          newCards[firstIndex].flipped = false;
          newCards[secondIndex].flipped = false;
          setCards(newCards);
        }, 1000);
      }
      setFlippedIndices([]);
    }
  }, [flippedIndices, cards, setMatchedPairs]);

  return (
    <div className="cards">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          className={`card ${card.flipped || card.matched ? 'flipped' : ''}`}
          onClick={() => handleCardClick(index)}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: card.flipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {card.flipped || card.matched ? (
            <span className="emoji">{card.emoji}</span>
          ) : (
            <div className="back">?</div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

export default CardGrid;