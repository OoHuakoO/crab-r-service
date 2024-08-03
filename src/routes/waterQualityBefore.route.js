const express = require("express");
const router = express.Router();
const waterQualityController = require("../controllers/waterQualityBefore.controller");
const verifyToken = require("../middlewares/auth.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/createWaterQualityBefore",
  verifyToken,
  upload.fields([
    { name: "salinityImg", maxCount: 1 },
    { name: "phImg", maxCount: 1 },
    { name: "alkalineImg", maxCount: 1 },
  ]),
  waterQualityController.createWaterQualityBefore
);
router.get(
  "/getWaterQualityBefore",
  verifyToken,
  waterQualityController.getWaterQualityBefore
);
router.get(
  "/getWaterQualityBeforeById/:id",
  verifyToken,
  waterQualityController.getWaterQualityBeforeById
);

module.exports = router;
