const express = require("express");

const router = express.Router();
const FirebaseAdmin = require("firebase-admin");

const db = require("../../firebase/firebase");

router.post("/create", async (req, res) => {
  try {
    const { roomname, username } = req.body;
    if (username && roomname) {
      const createMessage = username + " created the room.";
      const doc = await db.collection("rooms").add({
        roomname,
        members: [username],
      });
      await doc.collection("messages").add({
        text: createMessage,
        by: "",
      });
      const roomkey = doc.id;
      res.json({
        message: "successfully added.",
        roomkey: roomkey,
      });
    } else {
      res.status(400).json({
        message: "username/roomkey/roomname not provided.",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "internal server error occurred. try again.",
    });
  }
});

router.post("/join", (req, res) => {
  (async () => {
    try {
      const { username, roomkey } = req.body;
      if (username && roomkey) {
        const joinMessage = username + " joined the room.";
        const doc = await db.collection("rooms").doc(roomkey);
        const roomData = (await doc.get()).data();
        if (roomData.members.indexOf(username) == -1) {
          await doc.set(
            {
              members: [...roomData.members, username],
            },
            { merge: true }
          );
          await doc.collection("messages").add({ text: joinMessage, by: "" });
          const data = roomData;
          res.json({ message: "success", roomname: roomData.roomname });
        } else {
          res.status(400).json({ message: "Duplicate username." });
        }
      } else {
        res.status(400).json({ message: "Roomkey/Username not specified." });
      }
    } catch (e) {
      if (e.name == "TypeError") {
        res.status(404).json({ message: "Room Not Found." });
      } else {
        console.log(e);
        res.status(500).json({
          message: "Internal server error occurred. Try again.",
        });
      }
    }
  })();
});

router.post("/leave", (req, res) => {
  (async () => {
    try {
      const { username, roomkey } = req.body;
      if (username && roomkey) {
        const leaveMessage = username + " left the room.";
        const doc = await db.collection("rooms").doc(roomkey);
        const newData = (await doc.get()).data();
        const newMembers = newData.members;
        if (newMembers.indexOf(username) >= 0) {
          newMembers.splice(newMembers.indexOf(username), 1);
          await db.collection("rooms").doc(roomkey).set(
            {
              members: newMembers,
            },
            { merge: true }
          );
          await doc.collection("messages").add({ text: leaveMessage, by: "" });
          res.json({ message: "success!" });
        } else {
          res.status(404).json({ message: "user not found" });
        }
      } else {
        res.status(400).json({ message: "username/roomkey not provided" });
      }
    } catch (e) {
      console.log(e);
      res
        .status(500)
        .json({ message: "Internal server error occurred. Try again later." });
    }
  })();
});

module.exports = router;
