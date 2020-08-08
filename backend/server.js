const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const body_parser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 8080;
const app = express();
const roomsRouter = require(path.join(__dirname, "routes", "api", "rooms"));

const db = require("./firebase/firebase");

app.use(cors());
app.use(body_parser.json());
app.use("/api/chat-room", roomsRouter);

app.get("/", (req, res) => {
  res.send("I'm alive!");
});

// app.listen(PORT);

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("connected to the socket!");

  socket.on("disconnect", () => {
    console.log("disconnected.");
  });
});

server.listen(PORT);
