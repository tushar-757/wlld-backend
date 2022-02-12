const admin = require("firebase-admin");

var permissions = require("./fcmPermissions.json");
const firebaseApp2 = admin.initializeApp(
  {
    credential: admin.credential.cert(permissions),
  },
  "memechat"
);

var newMemeData = {};
var retMsg = "";
var memerId = 0;
var fcmTitle = "";
var fcmBody = "";

if (
  status === true ||
  status === "true" ||
  status === "True" ||
  status === "TRUE"
) {
  newMemeData.status = "Approved";
  retMsg = "Meme approved successfully";

  fcmTitle = "Submission for Campaign was accepted";
  //fcmBody = "Meme approved successfully";
} else {
  newMemeData.status = "Rejected";
  retMsg = "Meme rejected successfully";

  fcmTitle = "Submission for Campaign was rejected. Tap to send a revision";
  //fcmBody = "Meme rejected successfully";
}

const meme = await db1.collection("meme").where("memeId", "==", memeId).get();

if (!meme.empty) {
  var memeObj;

  meme.forEach((doc) => {
    doc.ref.update(newMemeData);
    memeObj = doc.data();
  });

  memerId = memeObj["memerId"];
}

memeData = {
  memeId: memeId,
  status: newMemeData.status,
};

const fcmToken = await db1
  .collection("memerFCM")
  .where("memerId", "==", memerId)
  .get();

if (!fcmToken.empty) {
  fcmToken.forEach((doc) => {
    tokenObj = doc.data();
  });

  const registrationToken = tokenObj["registrationToken"];

  const message = {
    token: registrationToken,
    notification: {
      title: fcmTitle,
      body: fcmBody,
    },
    data: {
      type: "2",
      data: JSON.stringify(memeData),
    },
  };

  var logData =
    "memerId : " +
    memerId +
    ", registrationToken : " +
    registrationToken +
    ", msg : " +
    JSON.stringify(message);

  console.log("Sending FCM message to ", logData);

  firebaseApp2
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
}
