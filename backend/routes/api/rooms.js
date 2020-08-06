const express = require("express");
const FirebaseAdmin = require("firebase-admin");
const serviceAccount = require("../../ServiceAccountKey.json");

const router = express.Router();
FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(serviceAccount),
});
const db = FirebaseAdmin.firestore();

router.post("/create", async (req, res) => {
  try {
    const { roomname, username } = req.body;
    if (username && roomname) {
      const doc = await db.collection("rooms").add({
        roomname,
        members: [username],
        messages: [],
      });
      const roomkey = doc.id;
      console.log(doc.id);
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
        const roomData = (
          await db.collection("rooms").doc(roomkey).get()
        ).data();
        if (roomData.members.indexOf(username) == -1) {
          await db
            .collection("rooms")
            .doc(roomkey)
            .set({ members: [...roomData.members, username] }, { merge: true });
          const data = roomData;
          console.log(roomData);

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
        const newMembers = (
          await db.collection("rooms").doc(roomkey).get()
        ).data().members;
        if (newMembers.indexOf(username) >= 0) {
          newMembers.splice(newMembers.indexOf(username), 1);
          await db
            .collection("rooms")
            .doc(roomkey)
            .set({ members: newMembers }, { merge: true });
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
