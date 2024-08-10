const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.get("/histories", verifyToken, notificationController.getHistories);

router.get(
  "/histories-read-count",
  verifyToken,
  notificationController.getHistoriesReadCount
);

module.exports = router;
