const express = require("express");
const router = express.Router();
const crabEggColorController = require("../controllers/crabEggColor.controller");

router.get("/crabEggColor", crabEggColorController.getCrabEggColor);
router.post("/crabEggColor", crabEggColorController.createCrabEggColor);

module.exports = router;
