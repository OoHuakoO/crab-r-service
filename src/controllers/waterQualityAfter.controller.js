const waterQualityAfterService = require("../services/waterQualityAfter.service");
const { uploadFileFirebase } = require("../utils/uploadFile");

async function createWaterQualityAfter(req, res, next) {
  try {
    console.log(
      "start createWaterQualityAfter.controller  req body :",
      req?.body
    );
    console.log(
      "start createWaterQualityAfter.controller  req files :",
      req?.files
    );

    const { location, pool, ammonia, calcium, magnesium } = req.body;
    const { ammoniaImg, calciumImg, magnesiumImg } = req.files;
    const userId = req.user.user_id;

    if (
      !(
        location &&
        pool &&
        ammonia &&
        calcium &&
        magnesium &&
        ammoniaImg?.[0] &&
        calciumImg?.[0] &&
        magnesiumImg?.[0]
      )
    ) {
      return res.json({
        data: "All input is required",
        status: 400,
      });
    }

    const ammoniaImgUrl = await uploadFileFirebase(ammoniaImg[0]);
    const calciumImgUrl = await uploadFileFirebase(calciumImg[0]);
    const magnesiumImgUrl = await uploadFileFirebase(magnesiumImg[0]);

    const waterQualityAfter = {
      userId,
      location,
      pool,
      ammonia,
      calcium,
      magnesium,
      ammoniaImg: ammoniaImgUrl,
      calciumImg: calciumImgUrl,
      magnesiumImg: magnesiumImgUrl,
    };

    const saveWaterQualityAfter =
      await waterQualityAfterService.createWaterQualityAfter(waterQualityAfter);
    console.log(
      "Saved WaterQualityAfter in controller:",
      saveWaterQualityAfter
    );
    res.json({
      data: saveWaterQualityAfter,
      status: 200,
    });
  } catch (err) {
    console.error("createWaterQualityAfter.controller error:", err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function getWaterQualityAfter(req, res, next) {
  try {
    console.log("start getWaterQualityAfter.controller");

    const waterQualityAfter =
      await waterQualityAfterService.getWaterQualityAfter();
    res.json({
      data: waterQualityAfter,
      status: 200,
    });
  } catch (err) {
    console.error("getWaterQualityAfter.controller error:", err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function getWaterQualityAfterById(req, res, next) {
  try {
    console.log(
      "start getWaterQualityAfterById.controller, id:",
      req?.params?.id
    );

    const waterQualityAfter =
      await waterQualityAfterService.getWaterQualityAfterById(req?.params?.id);
    if (!waterQualityAfter) {
      return res.json({
        data: "Water quality after not found",
        status: 404,
      });
    }
    res.json({
      data: waterQualityAfter,
      status: 200,
    });
  } catch (err) {
    console.error("getWaterQualityAfterById.controller error:", err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

module.exports = {
  createWaterQualityAfter,
  getWaterQualityAfter,
  getWaterQualityAfterById,
};