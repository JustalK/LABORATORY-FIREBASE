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
  /**
   * Get the data from one particular collection
   */
  e.getUsers = functions.https.onRequest(async (req, res) => {
    const snapshot = await db.collection("user").get();
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
    res.json({ result: true });
  });

  /**
   * https://firebase.google.com/docs/firestore/manage-data/add-data
   * Save something in the database
   */
  e.saveNewUser = functions.https.onRequest(async (req, res) => {
    const docRef = db.collection("user").doc("alovelace");

    await docRef.set({
      first: "Ada2",
      last: "Lovelace",
      born: 1815,
    });
    res.json({ result: true });
  });

  /**
   * Save something in the database
   */
  e.saveNewUser2 = functions.https.onRequest(async (req, res) => {
    db.collection("user").add({
      first: "Ada2",
      last: "Lovelace",
      born: 1815,
    });

    res.json({ result: true });
  });
};
