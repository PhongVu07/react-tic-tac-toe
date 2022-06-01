import Square from "components/Square";
import React from "react";
import { GameState, PlayerType, SquareState } from "types";

interface IProps {
  gameState: GameState;
  playerTurn: PlayerType
  setGameState: (state: GameState) => void
  setPlayerTurn: (player: PlayerType) => void
}

const Board: React.FC<IProps> = ({ gameState,playerTurn, setGameState ,setPlayerTurn}) => {
  const handleClickSquare = (squareIndex: number, player: PlayerType) => {
    if (!gameState[squareIndex]) {
      const shallowGameState = gameState.slice()
      shallowGameState[squareIndex] = player
      setGameState(shallowGameState)
      setPlayerTurn(player === "X" ? 'O' : 'X')
    }
  }

  return (
    <div className="board">
      {gameState.map((squareState: SquareState, index: number) => (
        <Square key={index} value={squareState} onClick={() => handleClickSquare(index, playerTurn)}/>
      ))}
    </div>
  );
};
export default Board;
