const CrabHatch = require("../models/crabHatch.model");

async function createCrabHatch(crabHatchData) {
  try {
    console.log(
      "start crabHatch.service createCrabHatch:",
      JSON.stringify(crabHatchData)
    );
    const newCrabHatch = new CrabHatch(crabHatchData);
    console.log("created new crabHatch instance");

    const saveCrabHatch = await newCrabHatch.save();
    console.log("saved crabHatch:", saveCrabHatch);

    return saveCrabHatch;
  } catch (error) {
    console.error("crabHatch.service error while createCrabHatch:", error);
    throw error;
  }
}

async function getCrabHatchAll(userId, query) {
  try {
    console.log("start crabHatch.service getCrabHatchAll query:", query);

    const page = parseInt(query?.page || 1);
    const limit = parseInt(query?.limit || 10);
    const offset = (page - 1) * limit;

    const crabHatches = await CrabHatch.find({
      userId: userId,
    })
      .sort({ createdAt: "desc" })
      .skip(offset)
      .limit(limit);

    const total = await CrabHatch.countDocuments({
      userId: userId,
    });

    return { data: crabHatches, total: total };
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
