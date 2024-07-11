const mongoose = require("mongoose");

const WaterQualityAfterSchema = new mongoose.Schema(
  {
    location: {
      type: String,
    },
    pool: {
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
