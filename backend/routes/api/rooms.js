const express = require("express");
const bcrypt = require("bcrypt");
const FirebaseAdmin = require("firebase-admin");
const serviceAccount = require("../../ServiceAccountKey.json");

const saltRounds = 10;

const router = express.Router();
FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(serviceAccount),
});
const db = FirebaseAdmin.firestore();

router.post("/create", (req, res) => {
  try {
    if (req.body.username && req.body.roomKey && req.body.roomName) {
      let roomKey = req.body.roomKey;
      //   bcrypt.hash(req.body.roomKey, saltRounds, (err, hashedKey) => {
      //     if (err) {
      //       console.log(err);
      //     } else {
      //   roomKey = hashedKey;
      db.collection("rooms").add({
        members: [req.body.username],
        messages: [],
        roomKey: roomKey,
        roomName: req.body.roomName,
      });
      res.status(200).json({ status: 200, message: "success" });
      // }
      //   });
    } else {
      res.status(400).json({
        status: 400,
        message: "username/roomKey/roomName not provided.",
      });
    }
  } catch (e) {
    res.status(500).json({
      status: 500,
      message: "internal server error occurred. try again.",
    });
  }
});

router.post("/join", (req, res) => {
  if (req.body.username && req.body.roomKey) {
    let roomKey = req.body.roomKey;
    // bcrypt.hash(req.body.roomKey, saltRounds, (err, hashedKey) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    // roomKey = hashedKey;
    console.log(req.body.roomKey, "--", roomKey);
    let query = db.collection("rooms").where("roomKey", "==", roomKey);
    query.get().then((querySnapshot) => {
      querySnapshot.forEach((documentSnapshot) => {
        console.log(documentSnapshot.data());
      });
    });
    res.status(200).json({ status: 200, message: "success" });
    //   }
    // });
  }
});

module.exports = router;
