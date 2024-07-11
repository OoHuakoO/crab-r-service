const mongoose = require("mongoose");

const WaterQualityAfterSchema = new mongoose.Schema(
  {
    location: {
      type: String,
    },
    pool: {
      type: String,
    },
    crabEggColor: {
      type: String,
    },
    calciumImg: {
      type: String,
    },
    releaseDate: {
      type: Date,
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
