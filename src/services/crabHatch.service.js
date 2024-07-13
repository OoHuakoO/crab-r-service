const CrabHatch = require("../models/crabHatch.model");

async function createCrabHatch(crabHatchData) {
  try {
    console.log(
      "start crabHatch.service createCrabHatch:",
      JSON.stringify(crabHatchData)
    );
    const newCrabHatch = new CrabHatch(crabHatchData);
    console.log("Created new CrabHatch instance");

    const saveCrabHatch = await newCrabHatch.save();
    console.log("Saved CrabHatch:", saveCrabHatch);

    return saveCrabHatch;
  } catch (error) {
    console.error("crabHatch.service error while createCrabHatch:", error);
    throw error;
  }
}

async function getCrabHatchAll() {
  try {
    console.log("start crabHatch.service getCrabHatchAll");
    const crabHatches = await CrabHatch.find();
    return crabHatches;
  } catch (error) {
    console.error("crabHatch.service getCrabHatchAll error:", error);
    throw error;
  }
}

async function getCrabHatchById(id) {
  try {
    console.log("start getCrabHatchById.service getCrabHatchById", id);

    const crabHatch = await CrabHatch.findById(id);
    return crabHatch;
  } catch (error) {
    console.error("getCrabHatchById.service getCrabHatchById error:", error);
    throw error;
  }
}

module.exports = {
  createCrabHatch,
  getCrabHatchAll,
  getCrabHatchById,
};
