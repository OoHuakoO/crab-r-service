const express = require("express");
const router = express.Router();
const commonComtroller = require("../controllers/common.controller");

router.get("/location", commonComtroller.location);

router.get("/pool", commonComtroller.pool);

module.exports = router;
