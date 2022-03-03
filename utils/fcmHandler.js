const FCM = require("fcm-node");
const {
  updateFCMToken,
} = require("../src/v1/Memer/controller/memerController");
const serverKey = process.env.MESAGGING_SERVER_KEY;
const fcm = new FCM(serverKey);

exports.sendNotification = async (req, res, next) => {
  try {
    const { fcmTitle, retMsg, fcmToken, previousCampaignMeme } = req;
    let returnData = {};
    let message = {
      to: fcmToken,
      notification: {
        title: fcmTitle,
      },

      data: {
        type: "2",
        data: JSON.stringify(previousCampaignMeme),
      },
    };

    await fcm.send(message, function (err, response) {
      if (err) {
        returnData = {
          status: false,
          message: retMsg,
        };
      } else {
        returnData = {
          status: true,
          message: retMsg,
          data: response,
        };
      }
      // console.log(response);
    });
  } catch (error) {
    console.log(error);
  }
};
