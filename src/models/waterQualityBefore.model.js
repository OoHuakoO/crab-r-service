const mongoose = require("mongoose");

const WaterQualityBeforeSchema = new mongoose.Schema(
  {
    location: {
      type: String,
    },
    pool: {
      type: String,
    },
    salinityImg: {
      type: String,
    },
    phImg: {
      type: String,
    },
    alkalineImg: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const WaterQualityBefore = mongoose.model(
  "waterQualityBefore",
  WaterQualityBeforeSchema
);

module.exports = WaterQualityBefore;
