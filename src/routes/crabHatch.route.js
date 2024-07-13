const express = require("express");
const router = express.Router();
const crabHatchController = require("../controllers/crabHatch.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post(
  "/createCrabHatch",
  verifyToken,
  crabHatchController.createCrabHatch
);
router.get("/crabHatchAll", crabHatchController.getCrabHatch);
router.get("/crabHatchById/:id", crabHatchController.getCrabHatchById);

module.exports = router;
