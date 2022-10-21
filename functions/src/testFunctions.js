const functions = require("firebase-functions");
const app = require("./config");

module.exports = function (e) {
  e.test = functions.https.onRequest(async (req, res) => {
    console.log("test");
    res.json({ result: true });
  });
};
