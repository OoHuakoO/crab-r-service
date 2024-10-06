var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const nodemailer = require('nodemailer'); 
const FcmTokenDevice = require("../models/fcmTokenDevice.model");
const User = require("../models/user.model");
require("dotenv").config();

async function findByEmail(email) {
  try {
    console.log("start user.service findByEmail email:", email);

    const user = await User.findOne({ email: email });

    return user;
  } catch (error) {
    console.error(
      "login.service error findByEmail:",
      error
    );
    throw error;
  }
}

async function register(email, password,name,surname,location) {
  try {
    console.log("start user.service create email:", email);

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email,
      password: encryptedPassword,
      name:name,
      surname:surname,
      location:location,
      role: "user",
    });

    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);

    user.token = token;

    console.log("create user successfully", user);

    return user;
  } catch (error) {
    console.error("login.service error register:", error);
    throw error;
  }
}

async function login(user) {
  try {
    console.log(
      "start login.service with user:",
      JSON.stringify(user, null, 2)
    );

    const token = jwt.sign(
      { user_id: user._id, email: user?.email },
      process.env.TOKEN_KEY
    );

    user.token = token;

    return user;
  } catch (error) {
    console.error("login.service error while login:", error);
    throw error;
  }
}

async function createFcmToken(userId, fcmToken, platform = "android") {
  try {
    console.log("start user.service createFcmToken fcmToken : ", fcmToken);

    // Check if a document with the same userId and fcmToken  and  platform already exists
    const existingFcmTokenDevice = await FcmTokenDevice.findOne({
      userId,
      fcmToken,
      platform,
    });

    if (existingFcmTokenDevice) {
      console.log("FcmTokenDevice already exists:", existingFcmTokenDevice);
      return existingFcmTokenDevice; // Return the existing document
    }

    const newFcmTokenDevice = new FcmTokenDevice({
      userId,
      fcmToken,
      platform,
    });
    console.log("created new newFcmTokenDevice instance");

    const saveFcmTokenDevice = await newFcmTokenDevice.save();
    console.log("saved fcmTokenDevice:", saveFcmTokenDevice);

    return saveFcmTokenDevice;
  } catch (error) {
    console.error("user.service createFcmToken error:", error);
    throw error;
  }
}

async function removeFcmToken(userId, fcmToken, platform = "android") {
  try {
    console.log("start user.service removeFcmToken fcmToken : ", fcmToken);

    const result = await FcmTokenDevice.deleteOne({
      userId,
      fcmToken,
      platform,
    });

    return result;
  } catch (error) {
    console.error("user.service removeFcmToken error:", error);
    throw error;
  }
}

async function removeUser(userId) {
  try {
    console.log("start user.service removeUser");

    const result = await User.deleteOne({ _id: userId });

    return result;
  } catch (error) {
    console.error("user.service removeUser error:", error);
    throw error;
  }
}

async function forgetPassword(user) {
  try {
    console.log("start user.service forgetPassword");

     const resetToken = crypto.randomBytes(32).toString('hex');
     user.resetToken = resetToken;
     user.resetTokenExpiry = Date.now() + 3600000; // Token หมดอายุภายใน 1 ชั่วโมง
 
     await user.save();
 
     const transporter = nodemailer.createTransport({
       service: 'gmail', 
       auth: {
         user: process.env.EMAIL_SENDER,
         pass: process.env.PASSWORD_SENDER,
       },
     });
 
     const mailOptions = {
       to: user.email,
       from: process.env.EMAIL_SENDER,
       subject: 'Reset Password',
       text: `กดที่ลิงก์เพื่อตั้งรหัสผ่านใหม่: \n \n
       http://localhost:3000/reset-password/${resetToken}`,
     };
 
     await transporter.sendMail(mailOptions);

    return true;
  } catch (error) {
    console.error("user.service removeUser error:", error);
    throw error;
  }
}

module.exports = {
  findByEmail,
  register,
  login,
  createFcmToken,
  removeFcmToken,
  removeUser,
  forgetPassword
};
