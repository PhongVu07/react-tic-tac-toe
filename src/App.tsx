import React, { useState, useEffect } from "react";
import { WiDaySunny, WiNightAltSleet } from "react-icons/wi";
import { GameState, PlayerType } from "types";
import { Board } from "components";

import "./App.css";

function App() {
  const [gameState, setGameState] = useState<GameState>(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState<PlayerType>("X");
  const [winner, setWinner] = useState<PlayerType | null>(null);
  const [isGameDraw, setIsGameDraw] = useState<boolean>(false);

  const isGameOver = !!winner || isGameDraw;

  const handleRestartGame = () => {
    setGameState(Array(9).fill(null));
    setPlayerTurn("X");
    setWinner(null);
    setIsGameDraw(false);
  };

  const checkWinner = (squares: GameState) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const winnerPlayer = checkWinner(gameState);
    setWinner(winnerPlayer);

    if (!winnerPlayer) {
      const isDraw = gameState.every((item) => !!item);
      setIsGameDraw(isDraw);
    }
  }, gameState);

  return (
    <>
      <section className="control">
        {!isGameOver && (
          <div className="align-item">
            <span>Next Player:</span>{" "}
            {playerTurn === "X" ? (
              <WiDaySunny color="red" />
            ) : (
              <WiNightAltSleet color="white" />
            )}
          </div>
        )}
        {!!winner && (
          <div className="align-item">
            <span>Winner:</span>{" "}
            {winner === "X" ? (
              <WiDaySunny color="red" />
            ) : (
              <WiNightAltSleet color="white" />
            )}
          </div>
        )}
        {isGameDraw && <div>Draw!</div>}
        {isGameOver && (
          <button className="restart-button" onClick={handleRestartGame}>
            Restart
          </button>
        )}
      </section>
      <section className="content">
        {isGameOver && <div className="overlay" />}
        <Board
          gameState={gameState}
          setGameState={setGameState}
          playerTurn={playerTurn}
          setPlayerTurn={setPlayerTurn}
        />
      </section>
    </>
  );
}

export default App;
