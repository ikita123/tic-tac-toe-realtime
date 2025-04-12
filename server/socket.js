const {
  joinGame,
  makeMove,
  resetGame,
  handleDisconnect,
} = require("./game/gameManager");

module.exports = function (io) {
  let games = {};

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_game", (room) => joinGame(socket, io, games, room));
    socket.on("make_move", (data) => makeMove(socket, io, games, data));
    socket.on("reset_game", (room) => resetGame(socket, io, games, room));
    socket.on("disconnect", () => handleDisconnect(socket, io, games));
  });
};
