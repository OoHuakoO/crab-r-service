const express = require("express");
const router = express.Router();
const commonController = require("../controllers/common.controller");

router.get("/location", commonController.getLocation);
router.get("/pool", commonController.getPool);
router.post("/location", commonController.createLocation);
router.post("/pool", commonController.createPool);

module.exports = router;
