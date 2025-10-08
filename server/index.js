// index.js — WeTravel backend starter
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.send("WeTravel backend is running 🚀");
});

// Create server for chat
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Socket.io setup
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat:message", (data) => {
    console.log("Message:", data);
    io.emit("chat:message", data);
  });

  socket.on("disconnect", () => console.log("User disconnected"));
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
