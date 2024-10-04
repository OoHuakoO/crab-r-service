const mongoose = require("mongoose");

const PoolSchema = new mongoose.Schema(
  {
    name: {
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

const Pool = mongoose.model("pool", PoolSchema);

module.exports = Pool;
