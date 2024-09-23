const crabHatchService = require("../services/crabHatch.service");

async function createCrabHatch(req, res, next) {
  try {
    console.log("start createCrabHatch.controller req body:", req?.body);
    const { location, pool, crabEggColor,crabEggScoopDate,crabReleaseDate } =
      req?.body;
    const userId = req.user.user_id;

    if (
      !(location && pool && crabEggColor && crabReleaseDate && crabEggScoopDate)
    ) {
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
      crabReleaseDate,
      crabEggScoopDate,
    };

    const crabHatch = await crabHatchService.createCrabHatch(crabHatchData);
    console.log("saved crabHatch in controller:", crabHatch);
    return res.json({
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
    console.log("start getCrabHatch.controller req query", req?.query);

    const userId = req.user.user_id;

    const crabHatches = await crabHatchService.getCrabHatchAll(
      userId,
      req?.query
    );
    return res.json({
      data: crabHatches.data,
      total: crabHatches.total,
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
    return res.json({
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
