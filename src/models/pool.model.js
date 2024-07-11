const mongoose = require("mongoose");

const PoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
  },
  { versionKey: false }
);

const Pool = mongoose.model("pool", PoolSchema);

module.exports = Pool;
