import React from "react";
import { FaRedo, FaPause } from "react-icons/fa";
import "../styles/gameInfo.css";

function GameInfo({ matchedPairs, attempts, timer, restartGame, gameOver, setEmojiSet, pauseGame }) {
  return (
    <div className="game-info">
      <h1 className="game-title">MemoryFlip</h1>
      <div className="info-stats">
        <div className="stat-item">
          <strong>Paquetes encontrados:</strong>
          <span>{matchedPairs}</span>
        </div>
        <div className="stat-item">
          <strong>Intentos:</strong>
          <span>{attempts}</span>
        </div>
        <div className="stat-item">
          <strong>Tiempo:</strong>
          <span>{timer}s</span>
        </div>
      </div>
      <div className="control-row">
        <div className="emoji-set-selection">
          <label htmlFor="emojiSet">Modo:</label>
          <div className="custom-select">
            <select id="emojiSet" onChange={(e) => setEmojiSet(e.target.value)}>
              <option value="frutas">🍓</option>
              <option value="caras">😎</option>
              <option value="animales">🐢</option>
            </select>
          </div>
        </div>
        <button onClick={pauseGame} className="pause-btn">
          <FaPause />
        </button>
        <button onClick={restartGame} className="restart-btn">
          <FaRedo />
        </button>
      </div>
      {gameOver && (
        <div className="game-over">
          <h2>¡Juego Terminado!</h2>
          <button onClick={restartGame} className="repeat-btn">
            <FaRedo />
          </button>
        </div>
      )}
    </div>
  );
}

export default GameInfo;
