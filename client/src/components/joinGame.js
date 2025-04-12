import React from "react";

const JoinGame = ({ room, setRoom, joinRoom, message }) => {
  return (
    <div className="join">
      <h2>Join Game Room</h2>
      <input
        placeholder="Room Code"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default JoinGame;
