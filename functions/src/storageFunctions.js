const functions = require("firebase-functions");
const admin = require("firebase-admin");
const formidable = require("formidable-serverless");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { getStorage, ref, uploadBytes } = require("firebase/storage");
const { faker } = require("@faker-js/faker");
const UUID = require("uuid-v4");

const app = require("./config");

module.exports = function (e) {
  /**
   * Init a collection
   */
  e.upload = functions.https.onRequest(async (req, res) => {
    const bucket = admin.storage().bucket();
    var form = new formidable.IncomingForm();
    const result = new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        var file = files.file;
        var filePath = file.path;

        let uuid = UUID();

        const response = await admin
          .storage()
          .bucket()
          .upload(filePath, {
            contentType: file.type,
            metadata: {
              metadata: {
                firebaseStorageDownloadTokens: uuid,
              },
            },
          });

        const fullMediaLink = response[0].metadata.mediaLink;
        const mediaLinkPath = fullMediaLink.substring(
          0,
          fullMediaLink.lastIndexOf("/") + 1
        );
        const downloadUrl =
          mediaLinkPath +
          encodeURIComponent(response[0].name) +
          "?alt=media&token=" +
          uuid;

        console.log({ fileInfo: response[0].metadata, downloadUrl });
        resolve({ fileInfo: response[0].metadata, downloadUrl });
      });
    });
    console.log(result);
    res.json(result);
  });
};
