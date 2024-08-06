const mongoose = require("mongoose");

const FcmTokenDeviceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fcmToken: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const FcmTokenDevice = mongoose.model("fcmTokenDevice", FcmTokenDeviceSchema);

module.exports = FcmTokenDevice;
