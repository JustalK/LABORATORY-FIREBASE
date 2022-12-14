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
    const result = await new Promise((resolve, reject) => {
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

        const bucketName = response[0].metadata.bucket;
        const downloadUrl =
          "https://firebasestorage.googleapis.com/v0/b/" +
          bucketName +
          "/o/" +
          encodeURIComponent(response[0].name) +
          "?alt=media&token=" +
          uuid;

        resolve({ fileInfo: response[0].metadata, downloadUrl });
      });
    });
    console.log(result);
    res.json(result);
  });

  e.download = functions.https.onRequest(async (req, res) => {
    const options = {
      destination:
        "/home/justalk/Downloads/upload_112c6ba53cc33a6ac27ca46ed15b9bf0.jpg",
    };
    const result = await admin
      .storage()
      .bucket()
      .file("upload_112c6ba53cc33a6ac27ca46ed15b9bf0")
      .download(options);

    res.json(result);
  });
};
