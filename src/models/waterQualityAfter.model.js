const mongoose = require("mongoose");

const WaterQualityAfterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    location: {
      type: String,
    },
    pool: {
      type: String,
    },
    ammonia: {
      type: String,
    },
    calcium: {
      type: String,
    },
    magnesium: {
      type: String,
    },
    ammoniaImg: {
      type: String,
    },
    calciumImg: {
      type: String,
    },
    magnesiumImg: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const WaterQualityAfter = mongoose.model(
  "WaterQualityAfter",
  WaterQualityAfterSchema
);

module.exports = WaterQualityAfter;
