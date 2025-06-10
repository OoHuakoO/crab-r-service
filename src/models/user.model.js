const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    name : {
      type: String,
    },
    surname : {
      type: String,
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
    },
    role: {
      type: String,
    },
    token: {
      type: String,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpiry: {
      type: Date, 
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("user", UserSchema);

module.exports = User;
