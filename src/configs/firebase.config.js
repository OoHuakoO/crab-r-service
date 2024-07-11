require("dotenv").config();

module.exports = {
  firebaseConfig: {
    apiKey: process.env.APIKEY_FB,
    authDomain: process.env.AUTHDOMAIN_FB,
    projectId: process.env.PROJECTID_FB,
    storageBucket: process.env.STORAGEBUCKET_FB,
    messagingSenderId: process.env.MESSAGINGSENDERID_FB,
    appId: process.env.APPID_FB,
  },
};
