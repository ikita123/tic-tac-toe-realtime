import React, { useState, useEffect } from "react";
import { socket } from "./socket";
import confetti from "canvas-confetti";

import "./App.css";
import JoinGame from "./components/joinGame";
import GameBoard from "./components/gameBoard";
import Scoreboard from "./components/scoreboard";

const App = () => {
  const [room, setRoom] = useState("");
  const [inRoom, setInRoom] = useState(false);
  const [symbol, setSymbol] = useState("");
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("X");
  const [message, setMessage] = useState("");
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const joinRoom = () => {
    if (room) socket.emit("join_game", room);
  };

  useEffect(() => {
    const handleJoined = ({ symbol, roomData }) => {
      setInRoom(true);
      setSymbol(symbol);
      setBoard(roomData.board);
      setTurn(roomData.turn);
      setScores(roomData.scores);
      setMessage("");
    };

    const handleRoomFull = () => {
      const msg = "Room is full. Please try another room.";
      alert(msg);
      setMessage(msg);
      setInRoom(false);
    };

    socket.on("joined", handleJoined);
    socket.on("room_full", handleRoomFull);

    socket.on("update_players", () => {
      setMessage("Both players joined. Game started.");
    });

    socket.on("player_left", () => {
      alert("Opponent left the game. Waiting for a new player...");
      setMessage("Waiting for new opponent...");
    });

    socket.on("move_made", ({ board, turn }) => {
      setBoard(board);
      setTurn(turn);
      setMessage("");
    });

    socket.on("game_over", ({ winner, board, scores }) => {
      setBoard(board);
      setScores(scores);
      if (winner !== "draw") {
        confetti();
      }
      const msg = winner === "draw" ? "It's a draw!" : `Player ${winner} wins!`;
      setMessage(msg);
    });

    socket.on("reset", (data) => {
      setBoard(data.board);
      setTurn(data.turn);
      setMessage("");
    });

    return () => {
      socket.off("joined", handleJoined);
      socket.off("room_full", handleRoomFull);
      socket.off("update_players");
      socket.off("player_left");
      socket.off("move_made");
      socket.off("game_over");
      socket.off("reset");
    };
  }, []);

  const handleClick = (index) => {
    if (board[index] || turn !== symbol) return;
    socket.emit("make_move", { room, index });
  };

  const handleReset = () => {
    socket.emit("reset_game", room);
  };

  const renderSymbol = (cell) => {
    if (cell === "X") return "❌";
    if (cell === "O") return "⭕";
    return "";
  };

  return (
    <div className="app">
      {!inRoom ? (
        <JoinGame
          room={room}
          setRoom={setRoom}
          joinRoom={joinRoom}
          message={message}
        />
      ) : (
        <>
          <GameBoard
            board={board}
            handleClick={handleClick}
            renderSymbol={renderSymbol}
            turn={turn}
            symbol={symbol}
            handleReset={handleReset}
            message={message}
          />
          <Scoreboard scores={scores} />
        </>
      )}
    </div>
  );
};

export default App;
