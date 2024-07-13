const CrabEggColor = require("../models/crabEggColor.model");

async function findByColorCrabEggColor(color) {
  try {
    console.log("start crabEggColor.service findByColorCrabEggColor:", color);
    const crabEggColor = await CrabEggColor.findOne({ color: color });
    return crabEggColor;
  } catch (error) {
    console.error(
      "crabEggColor.service error while findByColorCrabEggColor:",
      error
    );
    throw error;
  }
}

async function createCrabEggColor(color) {
  try {
    console.log("start crabEggColor.service crabEggColor color:", color);
    const crabEggColor = await CrabEggColor.create({ color: color });
    return crabEggColor;
  } catch (error) {
    console.error(
      "crabEggColor.service error while createCrabEggColor:",
      error
    );
    throw error;
  }
}

async function findAllCrabEggColor() {
  try {
    console.log("start crabEggColor.service findAllCrabEggColor");
    const crabEggColors = await CrabEggColor.find();
    return crabEggColors;
  } catch (error) {
    console.error(
      "crabEggColor.service error while findAllCrabEggColor:",
      error
    );
    throw error;
  }
}

module.exports = {
  findByColorCrabEggColor,
  createCrabEggColor,
  findAllCrabEggColor,
};
