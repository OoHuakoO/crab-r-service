const WaterQualityAfter = require("../models/waterQualityAfter.model");

async function createWaterQualityAfter(waterQualityAfter) {
  try {
    console.log(
      "start waterQualityAfter.service createWaterQualityAfter:",
      JSON.stringify(waterQualityAfter)
    );

    const newWaterQualityAfter = new WaterQualityAfter(waterQualityAfter);
    console.log("created new WaterQualityAfter instance");

    const saveWaterQualityAfter = await newWaterQualityAfter.save();
    console.log("saved WaterQualityAfter:", saveWaterQualityAfter);

    return saveWaterQualityAfter;
  } catch (error) {
    console.error(
      "waterQualityAfter.service createWaterQualityAfter error:",
      error
    );
    throw error;
  }
}

async function getWaterQualityAfter() {
  try {
    console.log("start waterQualityAfter.service getWaterQualityAfter");

    const waterQualityAfter = await WaterQualityAfter.find();
    return waterQualityAfter;
  } catch (error) {
    console.error(
      "waterQualityAfter.service getWaterQualityAfter error:",
      error
    );
    throw error;
  }
}

async function getWaterQualityAfterById(id) {
  try {
    console.log("start waterQualityAfter.service getWaterQualityAfterById", id);

    const waterQualityAfter = await WaterQualityAfter.findById(id);
    return waterQualityAfter;
  } catch (error) {
    console.error(
      "waterQualityAfter.service getWaterQualityAfterById error:",
      error
    );
    throw error;
  }
}

module.exports = {
  createWaterQualityAfter,
  getWaterQualityAfter,
  getWaterQualityAfterById,
};
