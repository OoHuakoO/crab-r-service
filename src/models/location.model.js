const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true
    },
     maxPool: {
      type: Number,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

const Location = mongoose.model("location", LocationSchema);

module.exports = Location;
