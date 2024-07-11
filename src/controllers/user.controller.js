const userService = require("../services/user.service");

const bcrypt = require("bcryptjs");

async function register(req, res, next) {
  try {
    console.log("start register.controller  req body :", req?.body);

    const { email, password } = req?.body;

    if (!(email && password)) {
      res.json({
        data: "all input is required",
        status: 400,
      });
    }

    const user = await userService.findByEmail(email);
    if (user) {
      res.json({
        data: "user already exist. Please login",
        status: 409,
      });
    }
    const userRegister = await userService.register(email, password);
    res.json({
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

    const { email, password } = req?.body;

    if (!(email && password)) {
      res.json({
        data: "all input is required",
        status: 400,
      });
    }

    const user = await userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const userLogin = await userService.login(user);
      res.json({
        data: userLogin,
        status: 200,
      });
    } else {
      res.json({
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

module.exports = {
  register,
  login,
};
