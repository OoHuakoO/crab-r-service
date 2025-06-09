const commonService = require("../services/common.service");
const userService = require("../services/user.service");

async function upsertLocation(req, res, next) {
  try {
    console.log("start createLocation.controller req body:", req?.body);

    const { name,maxPool } = req?.body;

    if (!name) {
      return res.json({
        data: "Location name is required",
        status: 400,
      });
    }

    const newLocation = await commonService.upsertLocation(name,maxPool);
    return res.json({
      data: newLocation,
      status: 200,
    });
  } catch (err) {
    console.error(`createLocation.controller error:`, err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function getLocation(req, res, next) {
  try {
    console.log("start getLocation.controller");

    const locations = await commonService.findAllLocation();
    return res.json({
      data: locations,
      status: 200,
    });
  } catch (err) {
    console.error(`getLocation.controller error:`, err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}


async function createFcmToken(req, res, next) {
  try {
    console.log("start createFcmToken.controller  req body :", req?.body);
    const { fcmToken ,platform} = req?.body;

    const userId = req.user.user_id;

    if(fcmToken && userId){
      await userService.createFcmToken(userId,fcmToken,platform); 
      return res.json({ data: "create fcmToken successfully", status: 200 });
    }
    return res.json({ data: "some input not found", status: 200 });
  } catch (err) {
    console.error(`createFcmToken.controller error:`, err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}


module.exports = {
  upsertLocation,
  getLocation,
  createFcmToken
};
