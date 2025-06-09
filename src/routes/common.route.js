const express = require("express");
const router = express.Router();
const commonController = require("../controllers/common.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.get("/location", commonController.getLocation);
router.post("/location", commonController.upsertLocation);
router.post("/createFcmToken",  verifyToken, commonController.createFcmToken)

module.exports = router;
