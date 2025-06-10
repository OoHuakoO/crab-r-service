var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const nodemailer = require('nodemailer'); 
const FcmTokenDevice = require("../models/fcmTokenDevice.model");
const User = require("../models/user.model");

require("dotenv").config();

async function findByID(userId) {
  try {
    console.log("start user.service findByID");

    const user = await User.findById({ _id: userId });

    return user;
  } catch (error) {
    console.error(
      "user.service error findByID:",
      error
    );
    throw error;
  }
}

async function findByEmail(email) {
  try {
    console.log("start user.service findByEmail email:", email);

    const user = await User.findOne({ email: email });

    return user;
  } catch (error) {
    console.error(
      "user.service error findByEmail:",
      error
    );
    throw error;
  }
}

async function findByResetToken(token) {
  try {
    console.log("start user.service findByResetToken");

    const user = await User.findOne({ resetToken: token ,resetTokenExpiry:{ $gt: Date.now() }});

    return user;
  } catch (error) {
    console.error(
      "user.service error findByResetToken:",
      error
    );
    throw error;
  }
}

async function register(email, password,name,surname,location,phone) {
  try {
    console.log("start user.service create email:", email);

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email,
      password: encryptedPassword,
      name:name,
      surname:surname,
      location:location,
      phone:phone,
      role: "user",
    });

    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);

    user.token = token;

    console.log("create user successfully", user);

    return user;
  } catch (error) {
    console.error("user.service error register:", error);
    throw error;
  }
}

async function login(user) {
  try {
    console.log(
      "start user.service login with user:",
      JSON.stringify(user, null, 2)
    );

    const token = jwt.sign(
      { user_id: user._id, email: user?.email },
      process.env.TOKEN_KEY
    );

    user.token = token;

    return user;
  } catch (error) {
    console.error("user.service error while login:", error);
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

    const resetToken = crypto.randomBytes(3).toString('hex');
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
      subject: 'Crab R Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #133D79; padding: 20px; text-align: center;">
            <h1 style="color: white; font-size: 24px;">Crab R Verification Code</h1>
          </div>
          <div style="padding: 20px;">
            <p>สวัสดีคุณ ${user.name},</p>
            <p>เราได้รับคำขอให้รีเซ็ตรหัสผ่านสำหรับบัญชี Crab R Application ของคุณ รหัสยืนยันของคุณคือ:</p>
            <h2 style="font-size: 36px; text-align: center; color: #333;">${resetToken}</h2>
            <p style="font-size: 14px; color: #555;">
              หากคุณไม่ได้ร้องขอรหัสนี้ อาจเป็นไปได้ว่ามีคนพยายามเข้าถึงบัญชีของคุณ
              กรุณาอย่าส่งต่อหรือบอกรหัสนี้ให้ผู้อื่นทราบ
            </p>
            <p style="font-size: 14px; color: #555;">
              รหัสนี้จะหมดอายุภายใน 60 นาที หากคุณไม่ได้ร้องขอให้รีเซ็ตรหัสผ่าน กรุณาละเว้นอีเมลนี้
            </p>
            <br/>
            <p>ขอแสดงความนับถือ,<br/>ทีมงาน Crab R</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return true;
  } catch (error) {
    console.error("user.service removeUser error:", error);
    throw error;
  }
}

async function changePassword(user,password) {
  try {
    console.log("start user.service changePassword");

    const encryptedPassword = await bcrypt.hash(password, 10);

    user.password = encryptedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    return true;
  } catch (error) {
    console.error("user.service changePassword error:", error);
    throw error;
  }
}


module.exports = {
  findByID,
  findByEmail,
  register,
  login,
  createFcmToken,
  removeFcmToken,
  removeUser,
  forgetPassword,
  findByResetToken,
  changePassword
};
