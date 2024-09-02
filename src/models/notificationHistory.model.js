const mongoose = require("mongoose");

const NotificationHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    crabHatchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "crabHatch",
      required: true,
    },
    fcmToken: {
      type: String,
    },
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    location: {
      type: String,
    },
    pool: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const NotificationHistory = mongoose.model(
  "notificationHistory",
  NotificationHistorySchema
);

module.exports = NotificationHistory;
