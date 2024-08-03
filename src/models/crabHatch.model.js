const mongoose = require("mongoose");

const CrabHatchSchema = new mongoose.Schema(
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
    crabEggColor: {
      type: String,
    },
    crabReleaseDate: {
      type: String,
    },
    crabEggScoopDate: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const CrabHatch = mongoose.model("crabHatch", CrabHatchSchema);

module.exports = CrabHatch;
