import React from "react";

const Scoreboard = ({ scores }) => {
  return (
    <div className="scoreboard">
      <h3>Scoreboard</h3>
      <p>Player X: {scores.X}</p>
      <p>Player O: {scores.O}</p>
    </div>
  );
};

export default Scoreboard;
