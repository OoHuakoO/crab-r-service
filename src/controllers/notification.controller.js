const notificationService = require("../services/notification.service");

async function getHistories(req, res, next) {
  try {
    console.log(
      "start notification.controller getHistories req query",
      req?.query
    );

    const userId = req.user.user_id;

    const notificationHistory = await notificationService.getHistories(
      userId,
      req?.query
    );

    return res.json({
      data: notificationHistory.data,
      total: notificationHistory.total,
      status: 200,
    });
  } catch (err) {
    console.error("notification.controller getHistories error:", err.message);
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

async function getHistoriesReadCount(req, res, next) {
  try {
    console.log("start notification.controller getHistoriesReadCount");

    const userId = req.user.user_id;

    const totalHistory = await notificationService.getHistoriesReadCount(
      userId
    );

    return res.json({
      data: totalHistory,
      status: 200,
    });
  } catch (err) {
    console.error(
      "notification.controller getHistoriesReadCount error:",
      err.message
    );
    res.json({ data: err.message, status: 500 });
    next(err);
  }
}

module.exports = {
  getHistories,
  getHistoriesReadCount,
};
