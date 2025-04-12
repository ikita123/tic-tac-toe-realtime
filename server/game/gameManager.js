const { checkWinner } = require("./utils");

function joinGame(socket, io, games, room) {
  const roomData = games[room] || {
    players: [],
    board: Array(9).fill(null),
    turn: "X",
    scores: { X: 0, O: 0 },
  };

  if (roomData.players.length >= 2) {
    socket.emit("room_full");
    return;
  }

  const playerSymbol = roomData.players.length === 0 ? "X" : "O";
  roomData.players.push({ id: socket.id, symbol: playerSymbol });
  games[room] = roomData;

  socket.join(room);
  socket.emit("joined", { symbol: playerSymbol, roomData });

  if (roomData.players.length === 2) {
    io.to(room).emit("update_players", roomData.players);
  }

  console.log(`User ${socket.id} joined room ${room} as ${playerSymbol}`);
}

function makeMove(socket, io, games, { room, index }) {
  const game = games[room];
  if (!game || game.board[index] !== null) return;

  game.board[index] = game.turn;
  const winner = checkWinner(game.board);

  if (winner) {
    game.scores[winner]++;
    io.to(room).emit("game_over", {
      winner,
      board: game.board,
      scores: game.scores,
    });
  } else if (!game.board.includes(null)) {
    io.to(room).emit("game_over", {
      winner: "draw",
      board: game.board,
      scores: game.scores,
    });
  } else {
    game.turn = game.turn === "X" ? "O" : "X";
    io.to(room).emit("move_made", { board: game.board, turn: game.turn });
  }
}

function resetGame(socket, io, games, room) {
  const game = games[room];
  if (game) {
    game.board = Array(9).fill(null);
    game.turn = "X";
    io.to(room).emit("reset", game);
  }
}

function handleDisconnect(socket, io, games) {
  console.log(`User disconnected: ${socket.id}`);
  for (const room in games) {
    games[room].players = games[room].players.filter((p) => p.id !== socket.id);
    if (games[room].players.length === 0) {
      delete games[room];
    } else {
      io.to(room).emit("player_left");
    }
  }
}

module.exports = {
  joinGame,
  makeMove,
  resetGame,
  handleDisconnect,
};
