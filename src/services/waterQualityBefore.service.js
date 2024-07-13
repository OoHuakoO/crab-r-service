const WaterQualityBefore = require("../models/waterQualityBefore.model");

async function createWaterQualityBefore(waterQualityBefore) {
  try {
    console.log(
      "start waterQualityBefore.service createWaterQualityBefore:",
      JSON.stringify(waterQualityBefore)
    );

    const newWaterQualityBefore = new WaterQualityBefore(waterQualityBefore);
    console.log("Created new WaterQualityBefore instance");

    const saveWaterQualityBefore = await newWaterQualityBefore.save();
    console.log("Saved WaterQualityBefore:", saveWaterQualityBefore);

    return saveWaterQualityBefore;
  } catch (error) {
    console.error(
      "waterQualityBefore.service createWaterQualityBefore error:",
      error
    );
    throw error;
  }
}

async function getWaterQualityBefore() {
  try {
    console.log("start waterQualityBefore.service getWaterQualityBefore");

    const waterQualityBefore = await WaterQualityBefore.find();
    return waterQualityBefore;
  } catch (error) {
    console.error(
      "waterQualityBefore.service getWaterQualityBefore error:",
      error
    );
    throw error;
  }
}

async function getWaterQualityBeforeById(id) {
  try {
    console.log(
      "start waterQualityBefore.service getWaterQualityBeforeById",
      id
    );

    const waterQualityBefore = await WaterQualityBefore.findById(id);
    return waterQualityBefore;
  } catch (error) {
    console.error(
      "waterQualityBefore.service getWaterQualityBeforeById error:",
      error
    );
    throw error;
  }
}

module.exports = {
  createWaterQualityBefore,
  getWaterQualityBefore,
  getWaterQualityBeforeById,
};
