const express = require("express");
const FirebaseAdmin = require("firebase-admin");
const serviceAccount = require("../../ServiceAccountKey.json");

const router = express.Router();
FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(serviceAccount),
});
const db = FirebaseAdmin.firestore();

router.post("/create", (req, res) => {
  try {
    const { roomName, username } = req.body;
    if (username && roomName) {
      const doc = db.collection("rooms").add({
        roomName,
        members: [username],
        messages: [],
      });
      const roomKey = doc.id;
      res.json({
        message: "successfully added.",
        roomKey: roomKey,
      });
    } else {
      res.status(400).json({
        message: "username/roomKey/roomName not provided.",
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
      const { username, roomKey } = req.body;
      if (username && roomKey) {
        const roomData = (
          await db.collection("rooms").doc(roomKey).get()
        ).data();

        await db
          .collection("rooms")
          .doc(roomKey)
          .set({ members: [...roomData.members, username] }, { merge: true });

        res.json({ message: "success" });
      } else {
        res.status(400).json({ message: "roomKey/username not specified." });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "Internal server error occurred. Try again.",
      });
    }
  })();
});

router.post("/leave", (req, res) => {
  (async () => {
    try {
      const { username, roomKey } = req.body;
      if (username && roomKey) {
        const newMembers = (
          await db.collection("rooms").doc(roomKey).get()
        ).data().members;
        if (newMembers.indexOf(username) >= 0) {
          newMembers.splice(newMembers.indexOf(username), 1);
          await db
            .collection("rooms")
            .doc(roomKey)
            .set({ members: newMembers }, { merge: true });
          res.status(200).json({ message: "success!" });
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
