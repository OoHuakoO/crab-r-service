const crabHatchService = require("../services/crabHatch.service");

async function createCrabHatch(req, res, next) {
  try {
    console.log("start createCrabHatch.controller req body:", req?.body);
    const {
      location,
      pool,
      crabEggColor,
      crabEggScoopDate,
      crabReleaseDate,
      countCrab,
    } = req?.body;
    const userId = req.user.user_id;

    if (
      !(
        location &&
        pool &&
        crabEggColor &&
        crabReleaseDate &&
        crabEggScoopDate &&
        countCrab
      )
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
      countCrab,
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

async function updateCrabHatch(req, res, next) {
  try {
    console.log("start updateCrabHatch.controller req body:", req?.body);
    const {
      id,
      location,
      pool,
      crabEggColor,
      crabEggScoopDate,
      crabReleaseDate,
      countCrab,
    } = req?.body;

    if (!id) {
      return res.json({
        data: "missing ID in crabHatchData",
        status: 400,
      });
    }

    if (
      !(
        location &&
        pool &&
        crabEggColor &&
        crabReleaseDate &&
        crabEggScoopDate &&
        countCrab
      )
    ) {
      return res.json({
        data: "all input is required",
        status: 400,
      });
    }

    const crabHatchData = {
      id,
      location,
      pool,
      crabEggColor,
      crabReleaseDate,
      crabEggScoopDate,
      countCrab,
    };

    const crabHatch = await crabHatchService.updateCrabHatch(crabHatchData);
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

async function adminCrabHatchAll(req, res, next) {
  try {
    console.log("start adminCrabHatchAll.controller req query", req?.query);

    const crabHatches = await crabHatchService.getCrabHatchAll(
      null,
      req?.query
    );
    return res.json({
      data: crabHatches.data,
      total: crabHatches.total,
      status: 200,
    });
  } catch (err) {
    console.error("adminCrabHatchAll.controller error:", err.message);
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
        status: 400,
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
  adminCrabHatchAll,
  updateCrabHatch,
};
