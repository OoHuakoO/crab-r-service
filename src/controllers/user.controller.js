const userService = require("../services/user.service");
const bcrypt = require("bcryptjs");

async function register(req, res, next) {
  try {
    console.log("start register.controller  req body :", req?.body);

    const { email, password, name,surname,location, fcmToken , platform } = req?.body;

    if (!(email && password && name && surname && location)) {
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
    const userRegister = await userService.register(email, password,name,surname,location);

    if(fcmToken){
      await userService.createFcmToken(userRegister._id, fcmToken,platform);
    }

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

    const { email, password, fcmToken , platform } = req?.body;

    if (!(email && password)) {
      return res.json({
        data: "all input is required",
        status: 400,
      });
    }

    const user = await userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const userLogin = await userService.login(user);
      if(fcmToken){
        await userService.createFcmToken(userLogin._id, fcmToken,platform);
      }
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

    const { fcmToken,platform } = req.body;

    const userId = req.user.user_id;

    if(fcmToken && userId){
      const resultRemove = await userService.removeFcmToken(userId, fcmToken,platform);

      if (resultRemove.deletedCount === 0) {
        return res.json({ data: "fcmToken not found", status: 400 });
      }

      console.log(`successfully removed fcmToken ${fcmToken} for user ${userId}`);
      return  res.json({ data: "fcmToken removed successfully", status: 200 });
    }
    return res.json({ data: "some input not found", status: 200 });
  } catch (err) {
    console.error(
      `removeFcmToken.controller error while removeFcmToken`,
      err.message
    );
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}


async function removeUser(req, res, next) {
  try {
    console.log(
      "start removeUser.controller req body :",
      JSON.stringify(req?.body, null, 2)
    );

    const { fcmToken,platform } = req.body;

    const userId = req.user.user_id;

    if(fcmToken && userId){
      const resultRemove = await userService.removeFcmToken(userId, fcmToken,platform);

      if (resultRemove.deletedCount === 0) {
        return res.json({ data: "fcmToken not found", status: 400 });
      }

      const resultRemoveUser = await userService.removeUser(userId);

      if (resultRemoveUser.deletedCount === 0) {
        return res.json({ data: "user not found", status: 400 });
      }

      console.log(`successfully removed fcmToken ${fcmToken} for user ${userId}`);
      return  res.json({ data: "fcmToken and user removed successfully", status: 200 });
    }
    return res.json({ data: "some input not found", status: 200 });
  } catch (err) {
    console.error(
      `removeUser.controller error while removeUser`,
      err.message
    );
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function forgetPassword(req, res, next) {
  try {
    console.log(
      "start forgetPassword.controller req body :",
      JSON.stringify(req?.body, null, 2)
    );
 
    const { email } = req.body;

    const user = await userService.findByEmail(email);

    if (!user) {
      return res.json({ data: "user not found", status: 400 });
    }

    const isSuccess = await userService.forgetPassword(user)

    console.log(`successfully send mail forget password`);

    if(isSuccess){
      return res.json({ data: "successfully send mail forget password", status: 200 });
    }
 
  } catch (err) {
    console.error(
      `forgetPassword.controller error while forgetPassword`,
      err.message
    );
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function changePassword(req, res, next) {
  try {
    console.log(
      "start changePassword.controller req body :",
      JSON.stringify(req?.body, null, 2)
    );
    const { token , password } = req.body;
    const user = await userService.findByResetToken(token);

    if (!user) {
      return res.json({ data: 'Invalid or expired token', status: 400 });
    }

    const isSuccess = await userService.changePassword(user,password)

    console.log(`successfully change password`);
    if(isSuccess){
      return res.json({ data: "successfully change password", status: 200 });
    }
 
  } catch (err) {
    console.error(
      `changePassword.controller error while changePassword`,
      err.message
    );
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}


async function getUser(req, res, next) {
  try {
    console.log("start getUser.controller");

    const userId = req.user.user_id;
    const user = await userService.findByID(userId);
    if (!user) {
      return res.json({
        data: "user not found please try again",
        status: 400,
      });
    }

    return res.json({
      data: user,
      status: 200,
    });
    
  } catch (err) {
    console.error(`register.controller error while creating user`, err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}


module.exports = {
  register,
  login,
  removeFcmToken,
  removeUser,
  forgetPassword,
  changePassword,
  getUser
};
