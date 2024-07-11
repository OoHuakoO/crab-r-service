const User = require("../models/user.model");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function findByEmail(email) {
  try {
    console.log("start user.service findByEmail email:", email);

    const user = await User.findOne({ email: email });

    return user;
  } catch (error) {
    console.error(
      "customerProfile.service error while findByIDCard customer profile:",
      error
    );
    throw error;
  }
}

async function register(email, password) {
  try {
    console.log("start user.service create email:", email);

    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email: email,
      password: encryptedPassword,
      role: "user",
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: 0 }
    );

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

module.exports = {
  findByEmail,
  register,
  login,
};
