const express = require("express");
const router = express.Router();
const waterQualityController = require("../controllers/waterQualityAfter.controller");
const verifyToken = require("../middlewares/auth.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/createWaterQualityAfter",
  verifyToken,
  upload.fields([
    { name: "ammoniaImg", maxCount: 1 },
    { name: "calciumImg", maxCount: 1 },
    { name: "magnesiumImg", maxCount: 1 },
  ]),
  waterQualityController.createWaterQualityAfter
);
router.get(
  "/getWaterQualityAfter",
  verifyToken,
  waterQualityController.getWaterQualityAfter
);
router.get(
  "/getWaterQualityAfterById/:id",
  verifyToken,
  waterQualityController.getWaterQualityAfterById
);

module.exports = router;
