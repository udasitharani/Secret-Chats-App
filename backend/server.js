const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

const FirebaseAdmin = require("firebase-admin");
const serviceAccount = require("./ServiceAccountKey.json");
FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(serviceAccount),
});

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(PORT);
