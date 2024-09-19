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

mongoose.connect(process.env.MONGODB_URI, {
  dbName: process.env.DB_NAME,
  user: process.env.USER_DB,
  pass: process.env.PASS_DB,
});

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
  const today = new Date().toISOString().split("T")[0];
  const startOfDay = new Date(today);
  const endOfDay = new Date(today);
  endOfDay.setDate(endOfDay.getDate() + 1);

  try {
    const crabsToNotify = await crabHatchModel.find({
      $or: [
        { crabReleaseDate: { $gte: startOfDay, $lt: endOfDay } },
        { crabEggScoopDate: { $gte: startOfDay, $lt: endOfDay } },
      ],
    });

    for (const crab of crabsToNotify) {
      const crabReleaseDate = crab.crabReleaseDate.toISOString().split("T")[0];
      const crabEggScoopDate = crab.crabEggScoopDate
        .toISOString()
        .split("T")[0];

      const userFcmTokens = await fcmTokenDeviceModel.find({
        userId: crab.userId,
      });

      userFcmTokens.forEach(async (tokenDoc) => {
        let message = {};

        if (crabReleaseDate === today && crabEggScoopDate === today) {
          message = {
            message: {
              notification: {
                title: "ถึงกำหนดวันเขี่ยไข่ปูและวันปล่อยปูแล้ว",
                body: `วันที่ : ${today}`,
              },
              token: tokenDoc.fcmToken,
            },
          };
        } else if (crabEggScoopDate === today) {
          message = {
            message: {
              notification: {
                title: "ถึงกำหนดวันเขี่ยไข่ปูแล้ว",
                body: `วันที่ : ${today}`,
              },
              token: tokenDoc.fcmToken,
            },
          };
        } else if (crabReleaseDate === today) {
          message = {
            message: {
              notification: {
                title: "ถึงกำหนดวันปล่อยปูแล้ว",
                body: `วันที่ : ${today}`,
              },
              token: tokenDoc.fcmToken,
            },
          };
        }

        try {
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

          const data = await response.json();

          if (data?.name) {
            // Check if the notification history for this crabHatchId and userId already exists
            const existingNotification = await notificationHistoryModel.findOne(
              {
                userId: tokenDoc?.userId,
                crabHatchId: crab?._id,
              }
            );

            // Only create a new history entry if it doesn't already exist
            if (!existingNotification) {
              await notificationHistoryModel.create({
                userId: tokenDoc?.userId,
                crabHatchId: crab?._id,
                title: message?.message?.notification?.title,
                message: message?.message?.notification?.body,
                pool: crab?.pool,
                location: crab?.location,
              });
              console.log(`Notification sent to ${tokenDoc.fcmToken}`);
            } else {
              console.log(`Notification already exists for ${crab?._id}`);
            }
          }
        } catch (error) {
          console.error(`Error sending notification: ${error}`);
        }
      });
    }
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
});

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
