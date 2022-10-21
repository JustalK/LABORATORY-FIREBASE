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

module.exports = app;
