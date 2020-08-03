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
    if (req.body.username && req.body.roomKey) {
      db.collection("rooms").add({
        members: [req.body.username],
        messages: [],
        roomKey: req.body.roomKey,
      });
      res.status(200).json({ status: 200, message: "success" });
    } else {
      res
        .status(400)
        .json({ status: 400, message: "username/roomKey not provided." });
    }
  } catch (e) {
    res
      .status(500)
      .json({
        status: 500,
        message: "internal server error occurred. try again.",
      });
  }
});

module.exports = router;
