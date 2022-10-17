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

module.exports = function (e) {
  e.test = functions.https.onRequest(async (req, res) => {
    console.log("test");
    res.json({ result: true });
  });
};
