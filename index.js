require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { google } = require("googleapis");
const cron = require("node-cron");
const app = express();
const user = require("./src/routes/user.route");
const common = require("./src/routes/common.route");
const waterQualityBeforeRoute = require("./src/routes/waterQualityBefore.route");
const waterQualityAfterRoute = require("./src/routes/waterQualityAfter.route");
const crabEggColorRoute = require("./src/routes/crabEggColor.route");
const crabHatchRoute = require("./src/routes/crabHatch.route");
const notificationRoute = require("./src/routes/notification.route");
const crabHatchModel = require("./src/models/crabHatch.model");
const fcmTokenDeviceModel = require("./src/models/fcmTokenDevice.model");
const notificationHistoryModel = require("./src/models/notificationHistory.model");

const port = process.env.PORT || 3000;
const MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
const SCOPES = [MESSAGING_SCOPE];

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// mongoose.connect(process.env.MONGODB_URI, {
//   dbName: process.env.DB_NAME,
//   user: process.env.USER_DB,
//   pass: process.env.PASS_DB,
// });

mongoose.connect('mongodb://127.0.0.1:27017/crab-r');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use("/user", user);
app.use("/common", common);
app.use("/water-quality-before", waterQualityBeforeRoute);
app.use("/water-quality-after", waterQualityAfterRoute);
app.use("/crab-egg-color", crabEggColorRoute);
app.use("/crab-hatch", crabHatchRoute);
app.use("/notification", notificationRoute);

const getAccessToken = () => {
  return new Promise(function (resolve, reject) {
    const jwtClient = new google.auth.JWT(
      process.env.CLIENT_EMAIL,
      null,
      process.env.PRIVATE_KEY_FCM,
      SCOPES,
      null
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
};

cron.schedule("0 6 * * *", async () => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const crabsToNotify = await crabHatchModel.find();

    for (const crab of crabsToNotify) {
      let crabEggScoopDateObj = new Date(crab.crabEggScoopDate);

      // Adjust crabEggScoopDate based on the egg color
      switch (crab.crabEggColor) {
        case 'ดำ (1 วัน)':
          crabEggScoopDateObj.setDate(crabEggScoopDateObj.getDate() + 1);
          break;
        case 'เทา (2 วัน)':
          crabEggScoopDateObj.setDate(crabEggScoopDateObj.getDate() + 2);
          break;
        case 'น้ำตาล (3 วัน)':
          crabEggScoopDateObj.setDate(crabEggScoopDateObj.getDate() + 3);
          break;
        case 'เหลือง-ส้ม (5 วัน)':
          crabEggScoopDateObj.setDate(crabEggScoopDateObj.getDate() + 5);
          break;
        default:
          crabEggScoopDateObj.setDate(crabEggScoopDateObj.getDate() + 1);
          break;
      }

      const crabEggScoopDate = crabEggScoopDateObj.toISOString().split("T")[0];

      if (crabEggScoopDate === today) {
        const userFcmTokens = await fcmTokenDeviceModel.find({
          userId: crab.userId,
        });

        // Send notifications to all FCM tokens linked to the user
        for (const tokenDoc of userFcmTokens) {
          const message = createNotificationMessage(tokenDoc.fcmToken, crab?.pool);

          try {
            const response = await sendFcmMessage(message);

            if (response?.name) {
              await saveNotificationHistory(tokenDoc.userId, crab, message);
            }
          } catch (error) {
            console.error(`Error sending notification : ${error}`);
          }
        }
      }
    }
  } catch (error) {
    console.error(`Error cronjob : ${error}`);
  }
});

// Helper function to create the notification message
const createNotificationMessage = (fcmToken, pool) => {
  return {
    message: {
      notification: {
        title: "Crab R",
        body: `ปล่อยปูบ่อที่ ${pool}`,
      },
      token: fcmToken,
    },
  };
};

// Helper function to send the FCM message
const sendFcmMessage = async (message) => {
  const response = await fetch(
    "https://fcm.googleapis.com/v1/projects/crab-r/messages:send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await getAccessToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }
  );
  return await response.json();
};

// Helper function to save the notification history
const saveNotificationHistory = async (userId, crab, message) => {
  const existingNotification = await notificationHistoryModel.findOne({
    userId: userId,
    crabHatchId: crab._id,
  });

  if (!existingNotification) {
    await notificationHistoryModel.create({
      userId: userId,
      crabHatchId: crab._id,
      title: message?.message?.notification?.title,
      message: message?.message?.notification?.body,
      pool: crab?.pool,
      location: crab?.location,
    });
    console.log(`Notification sent to ${userId}`);
  } else {
    console.log(`Notification already exists for ${crab._id}`);
  }
};


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
