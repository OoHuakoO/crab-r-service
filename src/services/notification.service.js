const NotificationHistory = require("../models/notificationHistory.model");

async function getHistories(userId, query) {
  try {
    console.log("start notification.service getHistories query:", query);

    const page = parseInt(query?.page || 1);
    const limit = parseInt(query?.limit || 10);
    const offset = (page - 1) * limit;

    const notificationHistory = await NotificationHistory.find({
      userId: userId,
    })
      .sort({ createdAt: "desc" })
      .skip(offset)
      .limit(limit);

    const total = await NotificationHistory.countDocuments({
      userId: userId,
    });

    return { data: notificationHistory, total: total };
  } catch (error) {
    console.error("notification.service getHistories error:", error);
    throw error;
  }
}

async function getHistoriesReadCount(userId) {
  try {
    console.log("start notification.service getHistoriesReadCount");

    const totalHistory = await NotificationHistory.countDocuments({
      userId: userId,
      read: false,
    });

    return totalHistory;
  } catch (error) {
    console.error("notification.service getHistoriesReadCount error:", error);
    throw error;
  }
}

module.exports = {
  getHistories,
  getHistoriesReadCount,
};
