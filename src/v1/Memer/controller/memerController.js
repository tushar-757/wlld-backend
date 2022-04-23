const moment = require("moment");
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
      message: "Memers fetched successfully",
      data: {
        memers: memers,
      },
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
    let clients = await db.CampaignMemer.find(
      { memerId: req.payload._id, isDeleted: false },
      {
        campaignId: true,
        quantity: true,
      }
    ).populate({
      path: "campaign",
      select: {
        status: true,
        brandUserId: true,
        brandId: true,
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

    const cl = [];

    clients.forEach((e) => {
      e.toObject();
      if (moment().isBefore(e.campaign.startDate)) {
        e["status"] = "Pending";
      } else if (moment().isBetween(e.campaign.startDate, e.campaign.endDate)) {
        e["status"] = "Running";
      } else {
        e["status"] = "Completed";
      }
      cl.push(e);
    });

    returnData = {
      status: true,
      message: "Clients fetched successfully",
      data: { price: req.payload.price, clients: cl },
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.getTransactions = async (req, res, next) => {
  try {
    let returnData;
    console.log(req.payload._id);
    const campaigns = await db.CampaignMemer.find(
      { memerId: req.payload._id, isDeleted: false },
      {
        campaignId: true,
        quantity: true,
        approvedMemes: true,
      }
    ).populate({
      path: "campaign",
      select: {
        endDate: true,
        brandId: true,
      },
      populate: {
        path: "brand",
        select: {
          brandName: true,
          brandLogo: true,
        },
      },
    });

    const price = req.payload.price;
    let earned = 0;
    let withdrawn = 0;
    let transactions = campaigns.map((campaign) => {
      earned += price * campaign.approvedMemes;
      return {
        brandName: campaign.campaign.brand.brandName,
        brandLogo: campaign.campaign.brand.brandLogo,
        amount: price * campaign.approvedMemes,
        dateTime: campaign.campaign.endDate,
      };
    });

    returnData = {
      status: true,
      message: "Transactions fetched successfully",
      data: { earned: earned, withdrawn: withdrawn, transactions },
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
    const campaigns = await db.CampaignMemer.find(
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
        brandId: true,
        description: true,
        campaignName: true,
      },
      populate: [
        {
          path: "brand",
          select: {
            brandName: true,
            brandLogo: true,
            website: true,
          },
        },
        {
          path: "brandUser",
          select: {
            phoneNo: true,
          },
        },
      ],
    });

    let campaignsData = campaigns.filter(
      (campaign) => campaign.campaign.status == "PO Approved"
    );

    returnData = {
      status: true,
      message: "Campaigns fetched successfully",
      data: campaignsData,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.addMemes = async (req, res, next) => {
  try {
    memerId = req.payload._id;

    const memeData = req.body.memes?.map((e) => {
      return {
        // caption: e.caption,
        // platformId: e.platformId,
        // formatId: e.formatId,
        fileName: e.fileName,
        filetype: e.fileType,
        // messagePath: e.messagePath,
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
    console.log(error);
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
    const tags = await db.Tag.find(
      {
        isDeleted: false,
      },
      {
        isDeleted: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
      }
    );

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
