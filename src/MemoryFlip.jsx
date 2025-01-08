import React, { useState, useEffect } from "react";
import GameInfo from "./components/GameInfo";
import CardGrid from "./components/CardGrid";

const emojiSets = {
  frutas: ["🍎", "🍌", "🍉", "🍓", "🍍", "🍑", "🍒", "🍇"],
  caras: ["😀", "😂", "😍", "😎", "😡", "😭", "😱", "😴"],
  animales: ["🐢", "🐋", "🦦", "🐝", "🐣", "🐷", "🐡", "🐼"]
};



function MemoryFlip() {
  const [emojiSet, setEmojiSet] = useState("frutas");
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (!gameOver) {
        setTimer((prev) => prev + 1);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [gameOver]);

  const restartGame = () => {
    setMatchedPairs(0);
    setAttempts(0);
    setTimer(0);
    setGameOver(false);
  };

  useEffect(() => {
    if (matchedPairs === emojiSets[emojiSet].length) {
      setGameOver(true);
    }
  }, [matchedPairs, emojiSet]);

  return (
    <div className="memory-game">
      <div className="app-container">
        <GameInfo
          matchedPairs={matchedPairs}
          attempts={attempts}
          timer={timer}
          restartGame={restartGame}
          gameOver={gameOver}
          setEmojiSet={setEmojiSet}
        />
        <CardGrid setMatchedPairs={setMatchedPairs} emojis={emojiSets[emojiSet]} />
      </div>
    </div>
  );
}  

export default MemoryFlip;