const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const FirebaseAdmin = require("firebase-admin");
const serviceAccount = require("./ServiceAccountKey.json");
FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(serviceAccount),
});
const db = FirebaseAdmin.firestore();

app.get("/", (req, res) => {
  db.collection("rooms")
    .get()
    .then((docs) => {
      res.send(docs);
    });
});

app.listen(PORT);
