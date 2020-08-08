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

io.on("connect", async (socket) => {
  let messagesCollection;

  socket.on("initialSetup", async (roomkey) => {
    messagesCollection = await db
      .collection("rooms")
      .doc(roomkey)
      .collection("messages");
    messagesCollection.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((messageDoc) => {
        const message = { id: messageDoc.id, ...messageDoc.data() };
        socket.emit("newMessage", message);
      });
    });
  });

  socket.on("pushMessage", async (message) => {
    await messagesCollection.add({ ...message });
  });

  socket.on("getInitialMessageFlood", async () => {
    const messages = [];
    const messagesCollectionRef = await messagesCollection.get();
    messagesCollectionRef.forEach((messageDoc) => {
      const message = { id: messageDoc.id, ...messageDoc.data() };
      messages.push(message);
    });
    socket.emit("initialMessageFlood", messages);
  });

  socket.on("disconnect", () => {
    console.log("disconnected.");
  });
});

server.listen(PORT);
