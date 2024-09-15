const express = require("express");
const router = express.Router();
const commonController = require("../controllers/common.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.get("/location", commonController.getLocation);
router.get("/pool", commonController.getPool);
router.post("/location", commonController.createLocation);
router.post("/pool", commonController.createPool);
router.post('createFcmToken',  verifyToken, commonController.createFcmToken)

module.exports = router;
