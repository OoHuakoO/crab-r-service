const mongoose = require("mongoose");

const CrabEggColorSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      unique: true,
    },
  },
  { versionKey: false }
);

const CrabEggColor = mongoose.model("crabEggColor", CrabEggColorSchema);

module.exports = CrabEggColor;
