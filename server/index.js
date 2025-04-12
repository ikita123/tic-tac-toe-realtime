const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const socketConfig = require("./config/socketConfig");

const registerSocketEvents = require("./socket");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, socketConfig);

registerSocketEvents(io);

const PORT = 4000;
server.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
