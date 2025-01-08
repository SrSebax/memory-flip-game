// src/components/MemoryGame.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const emojis = ["🍎", "🍌", "🍉", "🍓", "🍍", "🍑", "🍒", "🍇"]; // Lista de emojis

function MemoryFlip() {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);

  // Inicializamos las cartas de manera aleatoria
  useEffect(() => {
    const shuffledCards = [...emojis, ...emojis] // Duplicamos los emojis para formar pares
      .sort(() => Math.random() - 0.5) // Aleatorizamos el orden
      .map((emoji, index) => ({
        id: index,
        emoji,
        flipped: false,
        matched: false
      }));
    setCards(shuffledCards);
  }, []);

  // Manejar el clic sobre una carta
  const handleCardClick = (index) => {
    if (flippedIndices.length === 2 || cards[index].flipped || cards[index].matched) {
      return; // No hacer nada si ya hay dos cartas volteadas o la carta ya está emparejada
    }

    const newCards = [...cards];
    newCards[index].flipped = true;
    setCards(newCards);

    setFlippedIndices((prev) => [...prev, index]);
  };

  // Verificar si las dos cartas volteadas son un par
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
        }, 1000); // Voltear las cartas de nuevo después de un segundo
      }
      setFlippedIndices([]);
    }
  }, [flippedIndices, cards]);

  return (
    <div className="memory-game">
      <h1>MemoryFlip</h1>
      <p>Paquetes encontrados: {matchedPairs}</p>
      <div className="cards">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            className="card"
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
    </div>
  );
}

export default MemoryFlip;
