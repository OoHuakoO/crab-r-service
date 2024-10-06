const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/auth.middleware");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/remove-fcm-token", verifyToken, userController.removeFcmToken);

router.post("/removeUser", verifyToken, userController.removeUser);

router.post("/forget-password",  userController.forgetPassword);

router.get("/", verifyToken,userController.getUser);

module.exports = router;
