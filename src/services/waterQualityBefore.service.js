const WaterQualityBefore = require("../models/waterQualityBefore.model");

async function createWaterQualityBefore(waterQualityBefore) {
  try {
    console.log(
      "start waterQualityBefore.service createWaterQualityBefore:",
      JSON.stringify(waterQualityBefore)
    );

    const newWaterQualityBefore = new WaterQualityBefore(waterQualityBefore);
    console.log("created new WaterQualityBefore instance");

    const saveWaterQualityBefore = await newWaterQualityBefore.save();
    console.log("saved WaterQualityBefore:", saveWaterQualityBefore);

    return saveWaterQualityBefore;
  } catch (error) {
    console.error(
      "waterQualityBefore.service createWaterQualityBefore error:",
      error
    );
    throw error;
  }
}

async function updateWaterQualityBefore(waterQualityBefore) {
  try {
    console.log(
      "start waterQualityBefore.service updateWaterQualityBefore:",
      JSON.stringify(waterQualityBefore)
    );

    const { id, ...updateData } = waterQualityBefore;

    const updatedWaterQualityBefore =
      await WaterQualityBefore.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

    if (!updatedWaterQualityBefore) {
      throw new Error(`WaterQualityBefore with id ${id} not found`);
    }

    console.log("updated WaterQualityBefore:", updatedWaterQualityBefore);
    return updatedWaterQualityBefore;
  } catch (error) {
    console.error(
      "waterQualityBefore.service updateWaterQualityBefore error:",
      error
    );
    throw error;
  }
}

async function getWaterQualityBefore(userId, query) {
  try {
    console.log(
      "start waterQualityBefore.service getWaterQualityBefore query:",
      query
    );

    const page = parseInt(query?.page || 1);
    const limit = parseInt(query?.limit || 10);
    const offset = (page - 1) * limit;
    const filter = userId ? { userId } : {};

    const waterQualityBefore = await WaterQualityBefore.find(filter)
      .sort({ createdAt: "desc" })
      .skip(offset)
      .limit(limit);

    const total = await WaterQualityBefore.countDocuments(filter);

    return { data: waterQualityBefore, total: total };
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
  updateWaterQualityBefore,
};
