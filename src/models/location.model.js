const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
  },
  { versionKey: false }
);

const Location = mongoose.model("location", LocationSchema);

module.exports = Location;
