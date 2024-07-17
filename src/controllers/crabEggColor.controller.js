const crabEggColorService = require("../services/crabEggColor.service");

async function createCrabEggColor(req, res, next) {
  try {
    console.log("start createCrabEggColor.controller req body:", req?.body);

    const { color } = req?.body;

    if (!color) {
      return res.json({
        data: "crab egg color is required",
        status: 400,
      });
    }

    const crabEggColor = await crabEggColorService.findByColorCrabEggColor(
      color
    );
    if (crabEggColor) {
      return res.json({
        data: "crab egg color already exists",
        status: 409,
      });
    }

    const newCrabEggColor = await crabEggColorService.createCrabEggColor(color);
    return res.json({
      data: newCrabEggColor,
      status: 200,
    });
  } catch (err) {
    console.error(`createCrabEggColor.controller error:`, err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function getCrabEggColor(req, res, next) {
  try {
    console.log("start getCrabEggColor.controller");

    const crabEggColors = await crabEggColorService.findAllCrabEggColor();
    return res.json({
      data: crabEggColors,
      status: 200,
    });
  } catch (err) {
    console.error(`getCrabEggColor.controller error:`, err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

module.exports = {
  createCrabEggColor,
  getCrabEggColor,
};
