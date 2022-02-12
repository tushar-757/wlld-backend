const { validationResult } = require("express-validator");
const db = require("../../../NOSQL/database/mongodb");
const v = require("../../validators/validator");
const { GetById, GenerateToken } = require("../../functions/reusableFunctions");

exports.getMemeTypes = async (req, res, next) => {
  try {
    let returnData;
    const memeTypes = await db.MemeType.find(
      { isDeleted: false },
      { isDeleted: false }
    );
    returnData = {
      status: true,
      message: "Meme types fetched successfully",
      data: memeTypes,
    };
    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.updateMeme = async (req, res, next) => {
  try {
    let returnData;
    const { campaignMemeId, status } = req.body;

    const previousCampaignMeme = await db.CampaignMeme.findOneAndUpdate(
      { _id: campaignMemeId },
      { $set: req.body },
      { new: false }
    );
    let memeHistory = {};
    memeHistory.campaignMemeId = campaignMemeId;
    memeHistory.caption = previousCampaignMeme.caption;
    memeHistory.fileName = previousCampaignMeme.fileName;
    memeHistory.name = previousCampaignMeme.name;
    memeHistory.fileType = previousCampaignMeme.fileType;
    memeHistory.platformId = previousCampaignMeme.platformId;
    memeHistory.formatId = previousCampaignMeme.formatId;
    memeHistory.messagePath = previousCampaignMeme.messagePath;
    memeHistory.status = previousCampaignMeme.status;
    memeHistory.memerId = previousCampaignMeme.memerId;

    const newMemeHistory = await new db.CampaignMemeHistory(memeHistory);
    await newMemeHistory.save();

    if (status && status == "APPROVED") {
      await db.CampaignMemer.updateOne(
        { memerId: previousCampaignMeme.memerId },
        { $inc: { approvedMemes: 1 } }
      );

      // send notificaiton regardin approved or rejected
    }

    returnData = {
      status: true,
      message: "Meme updated successfully",
      data: { previousMemeData: memeHistory },
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
