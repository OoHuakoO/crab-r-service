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

    const { location, pool, salinity, ph, alkaline } = req.body;
    const { salinityImg, phImg, alkalineImg } = req.files;
    const userId = req.user.user_id;

    if (
      !(
        location &&
        pool &&
        salinity &&
        ph &&
        alkaline &&
        salinityImg?.[0] &&
        phImg?.[0] &&
        alkalineImg?.[0]
      )
    ) {
      return res.json({
        data: "All input is required",
        status: 400,
      });
    }

    const salinityImgUrl = await uploadFileFirebase(salinityImg[0]);
    const phImgUrl = await uploadFileFirebase(phImg[0]);
    const alkalineImgUrl = await uploadFileFirebase(alkalineImg[0]);

    const waterQualityBefore = {
      userId,
      location,
      pool,
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
      "Saved WaterQualityBefore in controller:",
      saveWaterQualityBefore
    );
    res.json({
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
    console.log("start getWaterQualityBefore.controller");

    const waterQualityBefore =
      await waterQualityBeforeService.getWaterQualityBefore();
    res.json({
      data: waterQualityBefore,
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
        data: "Water quality before not found",
        status: 404,
      });
    }
    res.json({
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
