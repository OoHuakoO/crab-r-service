const mongoose = require("mongoose");

const NotificationHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
    },
    message: {
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
