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

router.post(
  "/updateWaterQualityBefore",
  verifyToken,
  upload.fields([
    { name: "salinityImg", maxCount: 1 },
    { name: "phImg", maxCount: 1 },
    { name: "alkalineImg", maxCount: 1 },
  ]),
  waterQualityController.updateWaterQualityBefore
);

router.get(
  "/getWaterQualityBefore",
  verifyToken,
  waterQualityController.getWaterQualityBefore
);

router.get(
  "/adminGetWaterQualityBefore",
  verifyToken,
  waterQualityController.adminGetWaterQualityBefore
);

router.get(
  "/getWaterQualityBeforeById/:id",
  verifyToken,
  waterQualityController.getWaterQualityBeforeById
);

module.exports = router;
