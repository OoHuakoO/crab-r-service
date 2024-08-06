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
  },
  { versionKey: false }
);

const FcmTokenDevice = mongoose.model("FcmTokenDevice", FcmTokenDeviceSchema);

module.exports = FcmTokenDevice;
