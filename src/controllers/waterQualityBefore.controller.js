const waterQualityBeforeService = require("../services/waterQualityBefore.service");
const { uploadFileFirebase } = require("../utils/uploadFile");

async function createWaterQualityBefore(req, res, next) {
  try {
    console.log(
      "start createWaterQualityBefore.controller  req body :",
      req?.body
    );
    console.log(
      "start createWaterQualityBefore.controller  req files :",
      req?.files
    );

    const { location, salinity, ph, alkaline } = req.body;
    const { salinityImg, phImg, alkalineImg } = req.files;
    const userId = req.user.user_id;

    if (!(location &&  salinity && ph && alkaline)) {
      return res.json({
        data: "All input is required",
        status: 400,
      });
    }

    let salinityImgUrl;
    let phImgUrl;
    let alkalineImgUrl;
    if (salinityImg && salinityImg.length > 0) {
      salinityImgUrl = await uploadFileFirebase(salinityImg[0]);
    }
    if (phImg && phImg.length > 0) {
      phImgUrl = await uploadFileFirebase(phImg[0]);
    }
    if (alkalineImg && alkalineImg.length > 0) {
      alkalineImgUrl = await uploadFileFirebase(alkalineImg[0]);
    }

    const waterQualityBefore = {
      userId,
      location,
      salinity,
      ph,
      alkaline,
      salinityImg: salinityImgUrl,
      phImg: phImgUrl,
      alkalineImg: alkalineImgUrl,
    };

    const saveWaterQualityBefore =
      await waterQualityBeforeService.createWaterQualityBefore(
        waterQualityBefore
      );
    console.log(
      "saved WaterQualityBefore in controller:",
      saveWaterQualityBefore
    );
    return res.json({
      data: saveWaterQualityBefore,
      status: 200,
    });
  } catch (err) {
    console.error("createWaterQualityBefore.controller error:", err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function getWaterQualityBefore(req, res, next) {
  try {
    console.log("start getWaterQualityBefore.controller req query", req?.query);

    const userId = req.user.user_id;

    const waterQualityBefore =
      await waterQualityBeforeService.getWaterQualityBefore(userId, req?.query);

    return res.json({
      data: waterQualityBefore.data,
      total: waterQualityBefore.total,
      status: 200,
    });
  } catch (err) {
    console.error("getWaterQualityBefore.controller error:", err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function getWaterQualityBeforeById(req, res, next) {
  try {
    console.log(
      "start getWaterQualityBeforeById.controller, id:",
      req?.params?.id
    );

    const waterQualityBefore =
      await waterQualityBeforeService.getWaterQualityBeforeById(
        req?.params?.id
      );
    if (!waterQualityBefore) {
      return res.json({
        data: "water quality before not found",
        status: 404,
      });
    }
    return res.json({
      data: waterQualityBefore,
      status: 200,
    });
  } catch (err) {
    console.error("getWaterQualityBeforeById.controller error:", err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

module.exports = {
  createWaterQualityBefore,
  getWaterQualityBefore,
  getWaterQualityBeforeById,
};
