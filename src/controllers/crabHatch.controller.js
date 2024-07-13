const crabHatchService = require("../services/crabHatch.service");

async function createCrabHatch(req, res, next) {
  try {
    console.log("start createCrabHatch.controller req body:", req?.body);
    const { location, pool, crabEggColor, releaseDate } = req?.body;
    const userId = req.user.user_id;

    if (!(location && pool && crabEggColor && releaseDate)) {
      return res.json({
        data: "all input is required",
        status: 400,
      });
    }

    const crabHatchData = {
      userId,
      location,
      pool,
      crabEggColor,
      releaseDate,
    };

    const crabHatch = await crabHatchService.createCrabHatch(crabHatchData);
    console.log("saved crabHatch in controller:", crabHatch);
    res.json({
      data: crabHatch,
      status: 200,
    });
  } catch (err) {
    console.error("createCrabHatch.controller error:", err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function getCrabHatch(req, res, next) {
  try {
    console.log("start getCrabHatch.controller");

    const crabHatches = await crabHatchService.getCrabHatchAll();
    res.json({
      data: crabHatches,
      status: 200,
    });
  } catch (err) {
    console.error("getCrabHatch.controller error:", err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function getCrabHatchById(req, res, next) {
  try {
    console.log("start getCrabHatchById.controller, id:", req?.params?.id);

    const crabHatch = await crabHatchService.getCrabHatchById(req?.params?.id);
    if (!crabHatch) {
      return res.json({
        data: "crabHatch not found",
        status: 404,
      });
    }
    res.json({
      data: crabHatch,
      status: 200,
    });
  } catch (err) {
    console.error("getCrabHatchById.controller error:", err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

module.exports = {
  createCrabHatch,
  getCrabHatch,
  getCrabHatchById,
};
