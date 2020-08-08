const FirebaseAdmin = require("firebase-admin");
const serviceAccount = require("../ServiceAccountKey.json");
FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(serviceAccount),
});

const db = FirebaseAdmin.firestore();

module.exports = db;
