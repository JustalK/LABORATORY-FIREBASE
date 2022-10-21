const functions = require("firebase-functions");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");

const app = require("./config");
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

  /**
   * Save something in the database
   */
  e.saveNewUser3 = functions.https.onRequest(async (req, res) => {
    const newUser = db.collection("user").doc();
    const result = await newUser.set({
      first: "Kevin3",
      last: "Justal",
      born: 1750,
    });
    res.json(result);
  });

  /**
   * Update
   */
  e.updateUser = functions.https.onRequest(async (req, res) => {
    const userRef = db.collection("user").doc("alovelace");

    // Set the 'capital' field of the city
    await userRef.update({
      first: "Trololo2",
      timestamp: FieldValue.serverTimestamp(),
      born: FieldValue.increment(50),
    });
    res.json({ result: true });
  });

  e.reset = functions.https.onRequest(async (req, res) => {
    const snapshot = await db.collection("user").get();

    const batch = db.batch();
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    res.json({ result: true });
  });

  e.bash = functions.https.onRequest(async (req, res) => {
    const batch = db.batch();

    const firstRef = db.collection("user").doc();
    batch.set(firstRef, { first: "First" });

    const secondRef = db.collection("user").doc();
    batch.set(secondRef, { first: "Second" });

    const thirdRef = db.collection("user").doc();
    batch.set(thirdRef, { first: "Third" });

    await batch.commit();
    res.json({ result: true });
  });
};
