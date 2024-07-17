const commonService = require("../services/common.service");

async function createLocation(req, res, next) {
  try {
    console.log("start createLocation.controller req body:", req?.body);

    const { name } = req?.body;

    if (!name) {
      return res.json({
        data: "Location name is required",
        status: 400,
      });
    }

    const location = await commonService.findByNameLocation(name);
    if (location) {
      return res.json({
        data: "Location already exists",
        status: 409,
      });
    }

    const newLocation = await commonService.createLocation(name);
    return res.json({
      data: newLocation,
      status: 200,
    });
  } catch (err) {
    console.error(`createLocation.controller error:`, err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function getLocation(req, res, next) {
  try {
    console.log("start getLocation.controller");

    const locations = await commonService.findAllLocation();
    return res.json({
      data: locations,
      status: 200,
    });
  } catch (err) {
    console.error(`getLocation.controller error:`, err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function createPool(req, res, next) {
  try {
    console.log("start createPool.controller req body:", req?.body);

    const { name } = req?.body;

    if (!name) {
      return res.json({
        data: "Pool name is required",
        status: 400,
      });
    }

    const pool = await commonService.findByNamePool(name);
    if (pool) {
      return res.json({
        data: "Pool already exists",
        status: 409,
      });
    }

    const newPool = await commonService.createPool(name);
    return res.json({
      data: newPool,
      status: 200,
    });
  } catch (err) {
    console.error(`createPool.controller error:`, err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function getPool(req, res, next) {
  try {
    console.log("start getPool.controller");

    const pools = await commonService.findAllPool();
    return res.json({
      data: pools,
      status: 200,
    });
  } catch (err) {
    console.error(`getPool.controller error:`, err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

module.exports = {
  createLocation,
  getLocation,
  createPool,
  getPool,
};
