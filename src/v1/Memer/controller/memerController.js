const { validationResult } = require("express-validator");
const db = require("../../../NOSQL/database/mongodb");
const v = require("../../validators/validator");
const { GetById, GenerateToken } = require("../../functions/reusableFunctions");

exports.getMemerById = async (req, res, next) => {
  try {
    let returnData;
    const returnStr = JSON.stringify(returnData);
    console.log(returnStr);

    return res.status(200).json({});
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.getMemers = async (req, res, next) => {
  try {
    let returnData;
    const memers = await db.Memer.find(
      { isDeleted: false },
      {
        firstName: true,
        lastName: true,
        picture: true,
        price: true,
      }
    ).populate({
      path: "memerTag",
      select: { tagId: true, _id: false },
      match: { isDelete: false },
      populate: {
        path: "tag",
        select: {
          name: true,
        },
      },
    });
    returnData = {
      status: true,
      message: "Memers fetched succesfully",
      data: memers,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.getClients = async (req, res, next) => {
  try {
    let returnData;
    console.log(req.payload._id);
    const clients = await db.CampaignMemer.find(
      { memerId: req.payload._id, isDeleted: false },
      {
        price: true,
        campaignId: true,
        approvedMemes: true,
      }
    ).populate({
      path: "campaign",
      select: {
        status: true,
        brandUserId: true,
      },
      populate: {
        path: "brand",
        select: {
          brandName: true,
          brandLogo: true,
        },
      },
    });
    returnData = {
      status: true,
      message: "Clients fetched succesfully",
      data: clients,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getTransactions = async (req, res, next) => {
  try {
    let returnData;
    console.log(req.payload._id);
    const transactions = await db.CampaignMemer.find(
      { memerId: req.payload._id, isDeleted: false },
      {
        price: true,
        campaignId: true,
        quantity: true,
        submittedMemes: true,
        approvedMemes: true,
      }
    ).populate({
      path: "campaign",
      select: {
        brandUserId: true,
      },
      populate: {
        path: "brand",
        select: {
          brandName: true,
          brandLogo: true,
        },
      },
    });

    returnData = {
      status: true,
      message: "Transactions fetched succesfully",
      data: transactions,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getCampaigns = async (req, res, next) => {
  try {
    let returnData;
    console.log(req.payload._id);
    const clients = await db.CampaignMemer.find(
      { memerId: req.payload._id, isDeleted: false },
      {
        price: true,
        campaignId: true,
        quantity: true,
        submittedMemes: true,
        approvedMemes: true,
      }
    ).populate({
      path: "campaign",
      select: {
        status: true,
        brandUserId: true,
        startDate: true,
        endDate: true,
      },
      populate: {
        path: "brand",
        select: {
          brandName: true,
          brandLogo: true,
        },
      },
    });
    returnData = {
      status: true,
      message: "Clients fetched succesfully",
      data: clients,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.addMemes = async (req, res, next) => {
  try {
    memerId = req.payload._id;

    const memeData = req.body.map((e) => {
      return {
        caption: e.caption,
        platformId: e.platformId,
        formatId: e.formatId,
        fileName: e.fileName,
        filetype: e.fileType,
        messagePath: e.messagePath,
        name: e.name,
        memerId: memerId,
      };
    });
    const memes = await db.FeaturedMeme.insertMany(memeData);

    returnData = {
      status: true,
      message: "Featured memes uploaded successfully",
      data: memes,
    };
    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.addCampaignMemes = async (req, res, next) => {
  try {
    memerId = req.payload._id;
    console.log(memerId);
    const { campaignId } = req.body;

    const campaignMemeData = req.body.memeList.map((e) => {
      return {
        campaignId: campaignId,
        caption: e.caption,
        platformId: e.platformId,
        formatId: e.formatId,
        fileName: e.fileName,
        filetype: e.fileType,
        messagePath: e.messagePath,
        name: e.name,
        status: "PENDING",
        memerId: memerId,
      };
    });
    const memes = await db.CampaignMeme.insertMany(campaignMemeData);

    // increase submitted memes count
    await db.CampaignMemer.updateOne(
      { memerId: memerId, campaignId: campaignId },
      { $inc: { submittedMemes: req.body.memeList.length } }
    );

    returnData = {
      status: true,
      message: "Campaign memes uploaded successfully",
      data: memes,
    };
    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.updateFCMToken = async (req, res, next) => {
  try {
    var returnData;
    const { fcmToken } = req.body;

    await db.Memer.updateOne({ _id: req.payload._id }, { $set: req.body });

    returnData = {
      status: true,
      message: "FCM token updated successfully",
      data: fcmToken,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getTags = async (req, res, next) => {
  try {
    var returnData;
    const tags = await db.MemerTag.find(
      {
        memerId: req.payload._id,
        isDeleted: false,
      },
      {
        isDeleted: false,
        createdAt: false,
        updatedAt: false,
        memerId: false,
        __v: false,
      }
    ).populate({
      path: "tag",
      select: {
        name: true,
      },
    });

    returnData = {
      status: true,
      message: "Tags fetched successfully",
      data: tags,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
