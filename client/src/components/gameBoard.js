import React from "react";

const GameBoard = ({
  board,
  handleClick,
  renderSymbol,
  turn,
  symbol,
  handleReset,
  message,
}) => {
  return (
    <div className="game">
      <h2>You are: {symbol}</h2>
      <h3
        style={{
          transition: "0.3s",
          color: turn === symbol ? "green" : "#555",
        }}
      >
        Current Turn: {turn}
      </h3>

      <div className="board">
        {board.map((val, idx) => (
          <div
            key={idx}
            className={`cell ${val ? "filled" : ""}`}
            onClick={() => handleClick(idx)}
          >
            {renderSymbol(val)}
            <span className="symbol">{val}</span>
          </div>
        ))}
      </div>
      <button onClick={handleReset}>Restart Game</button>
      <p className="message">{message}</p>
    </div>
  );
};

export default GameBoard;
