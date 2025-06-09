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

    const { location, chlorine, ammonia, calcium, magnesium } = req.body;
    const { chlorineImg, ammoniaImg, calciumImg, magnesiumImg } = req.files;
    const userId = req.user.user_id;

    if (!(location && chlorine && ammonia && calcium && magnesium)) {
      return res.json({
        data: "All input is required",
        status: 400,
      });
    }

    let chlorineImgUrl;
    let ammoniaImgUrl;
    let calciumImgUrl;
    let magnesiumImgUrl;

    if (chlorineImg && chlorineImg.length > 0) {
      chlorineImgUrl = await uploadFileFirebase(chlorineImg[0]);
    }
    if (ammoniaImg && ammoniaImg.length > 0) {
      ammoniaImgUrl = await uploadFileFirebase(ammoniaImg[0]);
    }
    if (calciumImg && calciumImg.length > 0) {
      calciumImgUrl = await uploadFileFirebase(calciumImg[0]);
    }
    if (magnesiumImg && magnesiumImg.length > 0) {
      magnesiumImgUrl = await uploadFileFirebase(magnesiumImg[0]);
    }

    const waterQualityAfter = {
      userId,
      location,
      chlorine,
      ammonia,
      calcium,
      magnesium,
      ammoniaImg: ammoniaImgUrl,
      calciumImg: calciumImgUrl,
      magnesiumImg: magnesiumImgUrl,
      chlorineImg: chlorineImgUrl,
    };

    const saveWaterQualityAfter =
      await waterQualityAfterService.createWaterQualityAfter(waterQualityAfter);
    console.log(
      "saved waterQualityAfter in controller:",
      saveWaterQualityAfter
    );
    return res.json({
      data: saveWaterQualityAfter,
      status: 200,
    });
  } catch (err) {
    console.error("createWaterQualityAfter.controller error:", err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function updateWaterQualityAfter(req, res, next) {
  try {
    console.log(
      "start updateWaterQualityAfter.controller  req body :",
      req?.body
    );
    console.log(
      "start updateWaterQualityAfter.controller  req files :",
      req?.files
    );

    const { id, location, chlorine, ammonia, calcium, magnesium } = req.body;
    const { chlorineImg, ammoniaImg, calciumImg, magnesiumImg } = req.files;

    if (!id) {
      return res.json({
        data: "missing ID in updateWaterQualityAfter",
        status: 400,
      });
    }

    if (!(location && chlorine && ammonia && calcium && magnesium)) {
      return res.json({
        data: "All input is required",
        status: 400,
      });
    }

    let chlorineImgUrl;
    let ammoniaImgUrl;
    let calciumImgUrl;
    let magnesiumImgUrl;

    if (chlorineImg && chlorineImg.length > 0) {
      chlorineImgUrl = await uploadFileFirebase(chlorineImg[0]);
    }
    if (ammoniaImg && ammoniaImg.length > 0) {
      ammoniaImgUrl = await uploadFileFirebase(ammoniaImg[0]);
    }
    if (calciumImg && calciumImg.length > 0) {
      calciumImgUrl = await uploadFileFirebase(calciumImg[0]);
    }
    if (magnesiumImg && magnesiumImg.length > 0) {
      magnesiumImgUrl = await uploadFileFirebase(magnesiumImg[0]);
    }

    const waterQualityAfter = {
      id,
      location,
      chlorine,
      ammonia,
      calcium,
      magnesium,
      ammoniaImg: ammoniaImgUrl,
      calciumImg: calciumImgUrl,
      magnesiumImg: magnesiumImgUrl,
      chlorineImg: chlorineImgUrl,
    };

    const saveWaterQualityAfter =
      await waterQualityAfterService.updateWaterQualityAfter(waterQualityAfter);
      
    console.log(
      "saved waterQualityAfter in controller:",
      saveWaterQualityAfter
    );

    return res.json({
      data: saveWaterQualityAfter,
      status: 200,
    });
  } catch (err) {
    console.error("updateWaterQualityAfter.controller error:", err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function getWaterQualityAfter(req, res, next) {
  try {
    console.log("start getWaterQualityAfter.controller req query", req?.query);

    const userId = req.user.user_id;

    const waterQualityAfter =
      await waterQualityAfterService.getWaterQualityAfter(userId, req?.query);

    return res.json({
      data: waterQualityAfter.data,
      total: waterQualityAfter.total,
      status: 200,
    });
  } catch (err) {
    console.error("getWaterQualityAfter.controller error:", err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function adminGetWaterQualityAfter(req, res, next) {
  try {
    console.log(
      "start adminGetWaterQualityAfter.controller req query",
      req?.query
    );

    const waterQualityAfter =
      await waterQualityAfterService.getWaterQualityAfter(null, req?.query);

    return res.json({
      data: waterQualityAfter.data,
      total: waterQualityAfter.total,
      status: 200,
    });
  } catch (err) {
    console.error("adminGetWaterQualityAfter.controller error:", err.message);
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
        data: "water quality after not found",
        status: 400,
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
  adminGetWaterQualityAfter,
  updateWaterQualityAfter,
};
