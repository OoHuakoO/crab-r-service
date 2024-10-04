const mongoose = require("mongoose");

const CrabEggColorSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      unique: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const CrabEggColor = mongoose.model("crabEggColor", CrabEggColorSchema);

module.exports = CrabEggColor;
