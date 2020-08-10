const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const body_parser = require("body-parser");
const { PeerServer } = require("peer");
const peerServer = PeerServer({ port: 3001, path: "/video" });
const path = require("path");
const PORT = process.env.PORT || 8080;
const app = express();
const roomsRouter = require("./routes/api/rooms");
const FirebaseAdmin = require("firebase-admin");

const db = require("./firebase/firebase");
const root = path.join(__dirname, "build");

app.use(cors());
app.use(body_parser.json());
app.use("/api/chat-room", roomsRouter);
app.use(express.static(root));

app.get("*", (req, res) => {
  res.sendFile("index.html", { root });
});

const server = http.createServer(app);
const io = socketIO(server);

io.on("connect", async (socket) => {
  let messagesCollection;

  socket.on("initialSetup", async (roomkey) => {
    messagesCollection = await db
      .collection("rooms")
      .doc(roomkey)
      .collection("messages");
    messagesCollection
      .orderBy("timestamp", "asc")
      .onSnapshot((querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((messageDoc) => {
          const message = { id: messageDoc.id, ...messageDoc.data() };
          message["timestamp"] = message["timestamp"].toDate();
          messages.push(message);
        });
        socket.emit("newMessage", messages);
      });
  });

  socket.on("pushMessage", async (message) => {
    await messagesCollection.add({
      ...message,
      timestamp: FirebaseAdmin.firestore.FieldValue.serverTimestamp(),
    });
  });

  socket.on("join-video", (roomkey, userID) => {
    console.log("joined!", userID, roomkey);
    socket.join(roomkey);
    socket.to(roomkey).broadcast.emit("new-user", userID);

    socket.on("disconnect", () => {
      console.log("disconnected.");
      console.log(roomkey);
      socket.to(roomkey).broadcast.emit("close-user", userID);
    });
  });
});

server.listen(PORT);
console.log("listening on port: ", PORT);
