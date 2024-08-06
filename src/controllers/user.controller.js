const userService = require("../services/user.service");

const bcrypt = require("bcryptjs");

async function register(req, res, next) {
  try {
    console.log("start register.controller  req body :", req?.body);

    const { email, password, fcmToken } = req?.body;

    if (!(email && password && fcmToken)) {
      return res.json({
        data: "all input is required",
        status: 400,
      });
    }

    const user = await userService.findByEmail(email);
    if (user) {
      return res.json({
        data: "user already exist. Please login",
        status: 409,
      });
    }
    const userRegister = await userService.register(email, password);

    await userService.createFcmToken(userRegister._id, fcmToken);

    return res.json({
      data: userRegister,
      status: 200,
    });
  } catch (err) {
    console.error(`register.controller error while creating user`, err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function login(req, res, next) {
  try {
    console.log(
      "start login.controller  req body :",
      JSON.stringify(req?.body, null, 2)
    );

    const { email, password, fcmToken } = req?.body;

    if (!(email && password && fcmToken)) {
      return res.json({
        data: "all input is required",
        status: 400,
      });
    }

    const user = await userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const userLogin = await userService.login(user);
      await userService.createFcmToken(userLogin._id, fcmToken);
      return res.json({
        data: userLogin,
        status: 200,
      });
    } else {
      return res.json({
        data: "user not found please try again",
        status: 400,
      });
    }
  } catch (err) {
    console.error(`register.controller error while creating user`, err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function removeFcmToken(req, res, next) {
  try {
    console.log(
      "start removeFcmToken.controller req body :",
      JSON.stringify(req?.body, null, 2)
    );

    const { fcmToken } = req.body;

    const userId = req.user.user_id;

    if (!(fcmToken && userId)) {
      return res.json({
        data: "fcmToken and userId are required",
        status: 400,
      });
    }

    const resultRemove = await userService.removeFcmToken(userId, fcmToken);

    if (resultRemove.deletedCount === 0) {
      return res.json({ data: "fcmToken not found", status: 404 });
    }

    console.log(`Successfully removed fcmToken ${fcmToken} for user ${userId}`);

    res.json({ data: "fcmToken removed successfully", status: 200 });
  } catch (err) {
    console.error(
      `removeFcmToken.controller error while removeFcmToken`,
      err.message
    );
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

module.exports = {
  register,
  login,
  removeFcmToken,
};
