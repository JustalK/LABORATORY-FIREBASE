const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const config = {
  apiKey: "AIzaSyDOsAb82j7FYmCsa_sJB3p3CPquqyppikg",
  authDomain: "stoked-brand-140404.firebaseapp.com",
  projectId: "stoked-brand-140404",
  storageBucket: "stoked-brand-140404.appspot.com",
  messagingSenderId: "548932435382",
  appId: "1:548932435382:web:b198355119f26f70b79517",
};
admin.initializeApp(config);

exports.test = functions.https.onRequest(async (req, res) => {
  console.log("test");

  res.json({ result: true });
});

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await admin
    .firestore()
    .collection("messages")
    .add({ original: original });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});
