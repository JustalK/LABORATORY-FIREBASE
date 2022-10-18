const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const config = {
  apiKey: "AIzaSyDOsAb82j7FYmCsa_sJB3p3CPquqyppikg",
  authDomain: "stoked-brand-140404.firebaseapp.com",
  projectId: "stoked-brand-140404",
  storageBucket: "stoked-brand-140404.appspot.com",
  messagingSenderId: "548932435382",
  appId: "1:548932435382:web:b198355119f26f70b79517",
};
const app = admin.initializeApp(config);
const db = getFirestore(app);

module.exports = function (e) {
  e.getUsers = functions.https.onRequest(async (req, res) => {
    const snapshot = await db.collection("user").get();
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
    res.json({ result: true });
  });
};
