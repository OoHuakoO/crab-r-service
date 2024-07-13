const mongoose = require("mongoose");

const WaterQualityBeforeSchema = new mongoose.Schema(
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
    salinity: {
      type: String,
    },
    ph: {
      type: String,
    },
    alkaline: {
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
