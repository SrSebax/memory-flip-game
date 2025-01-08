import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

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
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 2,
        padding: 2,
        '@media (max-width: 600px)': {
          gridTemplateColumns: 'repeat(4, 1fr)', // Mantener 4x4 en pantallas pequeñas
        },
      }}
    >
      {cards.map((card, index) => (
        <Box
          key={card.id}
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: card.flipped || card.matched ? '#d4edda' : '#f5f5f5',
            borderRadius: '16px',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
            },
            boxShadow: card.flipped || card.matched ? '0px 0px 20px rgba(0, 0, 0, 0.3)' : '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }}
          onClick={() => handleCardClick(index)}
        >
          <motion.div
            className={`card ${card.flipped || card.matched ? 'flipped' : ''}`}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: card.flipped ? 180 : 0 }}
            transition={{ duration: 0.5 }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {card.flipped || card.matched ? (
              <Typography
                variant="h4"
                sx={{
                  fontSize: '2.5rem',
                  color: '#4CAF50',
                  transition: 'opacity 0.3s ease',
                  opacity: card.matched ? 0.7 : 1,
                }}
              >
                {card.emoji}
              </Typography>
            ) : (
              <div
                className="back"
                style={{
                  fontSize: '2.5rem',
                  color: '#888',
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'center',
                  opacity: 0.9,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ?
              </div>
            )}
          </motion.div>
        </Box>
      ))}
    </Box>
  );
}

export default CardGrid;