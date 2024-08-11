const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const sharp = require("sharp");
const config = require("../configs/firebase.config");
const { giveCurrentDateTime } = require("./time");

initializeApp(config.firebaseConfig);

const storage = getStorage();

async function compressImage(file) {
  return await sharp(file.buffer)
    .resize({ width: 600, height: 600 })
    .toBuffer();
}

async function uploadFileFirebase(file) {
  try {
    const dateTime = giveCurrentDateTime();
    const metadata = {
      contentType: file.mimetype,
    };

    const compressedBuffer = await compressImage(file);

    const storageRef = ref(
      storage,
      `files/${file.originalname + " " + dateTime}`
    );
    const snapshot = await uploadBytesResumable(
      storageRef,
      compressedBuffer,
      metadata
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

module.exports = {
  uploadFileFirebase,
};
