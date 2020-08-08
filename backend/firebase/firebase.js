const FirebaseAdmin = require("firebase-admin");
const serviceAccount = require("../ServiceAccountKey.json");
FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(serviceAccount),
});

console.log("firebaseseee");
const db = FirebaseAdmin.firestore();

module.exports = db;
