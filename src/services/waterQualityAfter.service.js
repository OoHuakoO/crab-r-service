const WaterQualityAfter = require("../models/waterQualityAfter.model");

async function createWaterQualityAfter(waterQualityAfter) {
  try {
    console.log(
      "start waterQualityAfter.service createWaterQualityAfter:",
      JSON.stringify(waterQualityAfter)
    );

    const newWaterQualityAfter = new WaterQualityAfter(waterQualityAfter);
    console.log("created new waterQualityAfter instance");

    const saveWaterQualityAfter = await newWaterQualityAfter.save();
    console.log("saved waterQualityAfter:", saveWaterQualityAfter);

    return saveWaterQualityAfter;
  } catch (error) {
    console.error(
      "waterQualityAfter.service createWaterQualityAfter error:",
      error
    );
    throw error;
  }
}

async function updateWaterQualityAfter(waterQualityAfter) {
  try {
    console.log(
      "start waterQualityAfter.service updateWaterQualityAfter:",
      JSON.stringify(waterQualityAfter)
    );

    const { id, ...updateData } = waterQualityAfter;

    const updatedWaterQualityAfter = await WaterQualityAfter.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedWaterQualityAfter) {
      throw new Error(`waterQualityAfter with id ${id} not found`);
    }

    console.log("updated waterQualityAfter:", updatedWaterQualityAfter);
    return updatedWaterQualityAfter;
  } catch (error) {
    console.error(
      "waterQualityAfter.service updateWaterQualityAfter error:",
      error
    );
    throw error;
  }
}

async function getWaterQualityAfter(userId, query) {
  try {
    console.log(
      "start waterQualityAfter.service getWaterQualityAfter query:",
      query
    );

    const page = parseInt(query?.page || 1);
    const limit = parseInt(query?.limit || 10);
    const offset = (page - 1) * limit;
    const filter = userId ? { userId } : {};

    const waterQualityAfter = await WaterQualityAfter.find(filter)
      .sort({ createdAt: "desc" })
      .skip(offset)
      .limit(limit);

    const total = await WaterQualityAfter.countDocuments(filter);

    return { data: waterQualityAfter, total: total };
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
  updateWaterQualityAfter,
};
