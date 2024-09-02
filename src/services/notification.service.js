const NotificationHistory = require("../models/notificationHistory.model");

async function getHistories(userId, query) {
  try {
    console.log("start notification.service getHistories query:", query);

    const page = parseInt(query?.page || 1);
    const limit = parseInt(query?.limit || 10);
    const offset = (page - 1) * limit;

    const notificationHistory = await NotificationHistory.find({
      fcmToken : query?.fcmToken,
      userId: userId,
    })
      .sort({ createdAt: "desc" })
      .skip(offset)
      .limit(limit);

    const unreadNotificationIds = notificationHistory
      .filter((doc) => !doc.read)
      .map((doc) => doc._id);

    if (unreadNotificationIds.length > 0) {
      await NotificationHistory.updateMany(
        { _id: { $in: unreadNotificationIds } },
        { $set: { read: true } }
      );
    }

    const total = await NotificationHistory.countDocuments({
      userId: userId,
    });

    return { data: notificationHistory, total: total };
  } catch (error) {
    console.error("notification.service getHistories error:", error);
    throw error;
  }
}

async function getHistoriesReadCount(userId,fcmToken) {
  try {
    console.log("start notification.service getHistoriesReadCount");

    const totalHistory = await NotificationHistory.countDocuments({
      fcmToken : fcmToken,
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
