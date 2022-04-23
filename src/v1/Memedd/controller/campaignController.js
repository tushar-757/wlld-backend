const { validationResult } = require("express-validator");
const db = require("../../../NOSQL/database/mongodb");
const v = require("../../validators/validator");
const { GetById, GenerateToken } = require("../../functions/reusableFunctions");
const brandUser = require("../../../NOSQL/models/brandUser");

exports.getBrandUserCampaigns = async (req, res, next) => {
  try {
    let returnData;
    console.log(req.payload._id);
    const campaigns = await db.Campaign.find(
      {
        brandUserId: req.payload._id,
        isDeleted: false,
      },
      {
        _id: true,
        campaignName: true,
        brandName: true,
        status: true,
      }
    );
    returnData = {
      status: true,
      message: "Campaign List fetched successfully",
      data: campaigns,
    };
    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// exports.getCampaign = async (req, res, next) => {
//   try {
//     const { campaignId } = req.body;
//     const campaignData = await db.Campaign.findById({
//       _id: campaignId,
//     })
//       .populate({
//         path: "campaignMemer",
//         match: { isDeleted: false },
//       })
//       .populate({
//         path: "campaignFormat",
//         match: { isDeleted: false },
//       })
//       .populate({
//         path: "campaignResource",
//         match: { isDeleted: false },
//       })
//       .populate({
//         path: "campaignObjective",
//         match: { isDeleted: false },
//       })
//       .populate({
//         path: "campaignMessage",
//         match: { isDeleted: false },
//       })
//       .populate({
//         path: "campaignDo",
//         match: { isDeleted: false },
//       })
//       .populate({
//         path: "campaignDont",
//         match: { isDeleted: false },
//       });

//     returnData = {
//       status: "false",
//       message: "Campaign data fetched successfully",
//       data: campaignData,
//     };
//     return res.status(200).json(returnData);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json(error);
//   }
// };

exports.getCampaign = async (req, res, next) => {
  try {
    const { campaignId } = req.body;
    let campaignData = await db.Campaign.findById(
      {
        _id: campaignId,
        isDeleted: false,
      },
      {
        isDeleted: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
      }
    ).populate({
      path: "brand",
      select: {
        isDeleted: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
      },
    });
    // });
    // .populate({
    //   path: "brandUser",
    //   select: { phoneNo: true },
    // });

    // campaignData = campaignData.toObject();
    // campaignData["phoneNo"] = req.payload.phoneNo;

    returnData = {
      status: true,
      message: "Campaign data fetched successfully",
      data: campaignData,
    };
    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.addCampaign = async (req, res, next) => {
  try {
    // MISSING PDF creation
    var returnData;
    const campaignStatus = "Campaign Created";
    const {
      campaignName,
      brandId,
      brandName,
      description,
      endDate,
      startDate,
    } = req.body;

    const campaign = await db.Campaign.findOne({
      $and: [
        { brandUserId: req.payload._id },
        { campaignName: campaignName },
        { isDeleted: false },
      ],
    });

    if (campaign) {
      returnData = {
        status: "false",
        message:
          "A campaign with the same name is already associated with this brand",
        data: {},
      };
    } else {
      const newCampaign = await db.Campaign({
        brandUserId: req.payload._id,
        brandId: brandId,
        brandName: brandName,
        campaignName: campaignName,
        description: description,
        endDate: endDate,
        startDate: startDate,
        status: campaignStatus,
      });
      await newCampaign.save();

      var campaignData = {
        campaignId: newCampaign._id,
      };

      returnData = {
        status: true,
        message: "Campaign created successfully",
        data: campaignData,
      };
    }
    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateCampaign = async (req, res, next) => {
  try {
    // MISSING PDF creation
    var returnData;
    const { campaignId } = req.body;
    const campaignData = await db.Campaign.findByIdAndUpdate(
      { _id: campaignId },
      {
        $set: req.body,
      }
    );
    returnData = {
      status: true,
      message: "Campaign updated successfully",
      data: campaignData,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getCampaignMemeHistory = async (req, res, next) => {
  try {
    let returnData;
    const { campaignMemeId } = req.body;

    const campaignMemeHistory = await db.CampaignMemeHistory.find(
      {
        campaignMemeId: campaignMemeId,
        isDeleted: false,
      },
      {
        campaignMemeId: false,
        createdAt: false,
        updatedAt: false,
        isDeleted: false,
        __v: false,
      }
    );

    returnData = {
      status: true,
      message: "Campaign memes fetched successfully",
      data: campaignMemeHistory,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getCampaignMemes = async (req, res, next) => {
  try {
    let returnData;
    const { campaignId } = req.body;

    const campaignMemes = await db.CampaignMeme.find(
      {
        campaignId: campaignId,
        isDeleted: false,
      },
      {
        isDeleted: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
      }
    )
      .populate({
        path: "memer",
        match: { isDeleted: false },
        select: {
          firstName: true,
          lastName: true,
          picture: true,
        },
      })
      .populate({
        path: "campaignMemer",
        match: { isDeleted: false },
        select: {
          campaignId: false,
          isDeleted: false,
          createdAt: false,
          updatedAt: false,
          __v: false,
        },
      });

    returnData = {
      status: true,
      message: "Campaign memes fetched successfully",
      data: campaignMemes,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// Campaign Memers
exports.getCampaignMemers = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId } = req.body;
    const memers = await db.CampaignMemer.find(
      {
        campaignId: campaignId,
        isDeleted: false,
      },
      {
        isDeleted: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
      }
    ).populate({
      path: "memer",
      match: { isDeleted: false },
      select: {
        firstName: true,
        lastName: true,
        price: true,
        picture: true,
        approvedMemes: true,
      },
      populate: {
        path: "memerTag",
        select: { tagId: true, _id: false },
        match: { isDelete: false },
        populate: {
          path: "tag",
          select: {
            name: true,
          },
        },
      },
    });

    returnData = {
      status: true,
      message: "Campaign memers fetched successfully",
      data: memers,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.addCampaignMemer = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId, memerId, name, price, quantity } = req.body;

    const campaignMemer = await db.CampaignMemer.findOne({
      $and: [{ campaignId: campaignId }, { memerId: memerId }],
    });

    if (campaignMemer) {
      let message;
      if (campaignMemer.isDeleted) {
        await campaignMemer.update({
          $set: { isDeleted: false },
        });
        message = "Campaign Memer added successfully";
      } else {
        message = "Campaign Memer already added to the Campaign";
      }
      returnData = {
        status: false,
        message: message,
        data: campaignMemer,
      };
    } else {
      const newCampaignMemer = new db.CampaignMemer({
        campaignId: campaignId,
        memerId: memerId,
        quantity: quantity,
      });
      await newCampaignMemer.save();

      returnData = {
        status: true,
        message: "Campaign Memer added successfully",
        data: newCampaignMemer,
      };
    }

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.deleteCampaignMemer = async (req, res, next) => {
  try {
    var returnData;
    const { campaignMemerCollectionId } = req.body;
    const deletedMemer = await db.CampaignMemer.findByIdAndUpdate(
      { _id: campaignMemerCollectionId },
      {
        $set: {
          isDeleted: true,
        },
      },
      { new: true }
    );

    returnData = {
      status: true,
      message: "Campaign Memer deleted successfully",
      data: deletedMemer,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Campaign Formats
exports.getCampaignFormat = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId } = req.body;

    const campaignFormats = await db.CampaignFormat.find(
      {
        campaignId: campaignId,
        isDeleted: false,
      },
      {
        isDeleted: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
      }
    )
      .populate({
        path: "platform",
        select: {
          isDeleted: false,
        },
      })
      .populate({
        path: "platformFormat",
        select: {
          isDeleted: false,
        },
      });

    returnData = {
      status: true,
      message: "Campaign formats for respective platforms fetched successfully",
      data: campaignFormats,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.addCampaignFormat = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId, platformId, formatId } = req.body;

    const campaignFormat = await db.CampaignFormat.findOne({
      $and: [
        { campaignId: campaignId },
        { platformId: platformId },
        { formatId: formatId },
      ],
    });

    if (campaignFormat) {
      let message;
      if (campaignFormat.isDeleted) {
        await campaignFormat.update({
          $set: { isDeleted: false },
        });
        message = "Campaign format for respective platforms added successfully";
      } else {
        message = "Campaign format already added to the Campaign";
      }
      returnData = {
        status: false,
        message: message,
        data: campaignFormat,
      };
    } else {
      const newCampaignFormat = new db.CampaignFormat({
        campaignId: campaignId,
        platformId: platformId,
        formatId: formatId,
      });
      await newCampaignFormat.save();

      returnData = {
        status: true,
        message: "Campaign format for respective platforms added successfully",
        data: newCampaignFormat,
      };
    }

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.deleteCampaignFormat = async (req, res, next) => {
  try {
    var returnData;
    const { campaignFormatCollectionId } = req.body;
    const deletedMemer = await db.CampaignMemer.findByIdAndUpdate(
      { _id: campaignFormatCollectionId },
      {
        $set: {
          isDeleted: true,
        },
      },
      { new: true }
    );

    returnData = {
      status: true,
      message: "Campaign format deleted successfully",
      data: deletedMemer,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Campaign Resources
exports.getCampaignResource = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId } = req.body;

    const campaignResources = await db.CampaignResource.find(
      {
        campaignId: campaignId,
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
      message: "Campaign resources fetched successfully",
      data: campaignResources,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.addCampaignResource = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId, fileName, resourceTypeId, description } = req.body;

    const newCampaignResource = new db.CampaignResource({
      campaignId: campaignId,
      fileName: fileName,
      resourceTypeId: resourceTypeId,
      description: description,
    });
    await newCampaignResource.save();

    returnData = {
      status: true,
      message: "Campaign resource added successfully",
      data: newCampaignResource,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteCampaignResource = async (req, res, next) => {
  try {
    var returnData;
    const { campaignResourceCollectionId } = req.body;
    const deletedResource = await db.CampaignResource.findByIdAndUpdate(
      { _id: campaignResourceCollectionId },
      {
        $set: {
          isDeleted: true,
        },
      },
      { new: true }
    );

    returnData = {
      status: true,
      message: "Campaign resource deleted successfully",
      data: deletedResource,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// Campaign Objectives

exports.getCampaignObjective = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId } = req.body;

    const campaignObjectives = await db.CampaignObjective.find(
      {
        campaignId: campaignId,
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
      message: "Campaign objectives fetched successfully",
      data: campaignObjectives,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.addCampaignObjective = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId, objective } = req.body;

    const newCampaignObjective = new db.CampaignObjective({
      campaignId: campaignId,
      objective: objective,
    });
    await newCampaignObjective.save();

    const updatedCampaignData = await db.Campaign.findByIdAndUpdate(
      { _id: campaignId },
      {
        $set: { status: "Brief Created" },
      }
    );

    returnData = {
      status: true,
      message: "Campaign Objective added successfully",
      data: newCampaignObjective,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.updateCampaignObjective = async (req, res, next) => {
  try {
    var returnData;
    const { campaignObjectiveCollectionId, objective } = req.body;

    const updatedCampaignObjective =
      await db.CampaignObjective.findByIdAndUpdate(
        { _id: campaignObjectiveCollectionId },
        {
          $set: {
            objective: objective,
          },
        },
        { new: true }
      );

    returnData = {
      status: true,
      message: "Campaign Objective updated successfully",
      data: updatedCampaignObjective,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteCampaignObjective = async (req, res, next) => {
  try {
    var returnData;
    const { campaignObjectiveCollectionId } = req.body;
    const deletedObjective = await db.CampaignObjective.findByIdAndUpdate(
      { _id: campaignObjectiveCollectionId },
      {
        $set: {
          isDeleted: true,
        },
      },
      { new: true }
    );

    returnData = {
      status: true,
      message: "Campaign objective deleted successfully",
      data: deletedObjective,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// Campaign Messages
exports.getCampaignMessage = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId } = req.body;

    const campaignMessages = await db.CampaignMessage.find(
      {
        campaignId: campaignId,
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
      message: "Campaign messages fetched successfully",
      data: campaignMessages,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.addCampaignMessage = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId, message } = req.body;

    const newCampaignMessage = new db.CampaignMessage({
      campaignId: campaignId,
      message: message,
    });
    await newCampaignMessage.save();

    returnData = {
      status: true,
      message: "Campaign Message added successfully",
      data: newCampaignMessage,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.updateCampaignMessage = async (req, res, next) => {
  try {
    var returnData;
    const { campaignMessageCollectionId, message } = req.body;

    const updatedCampaignMessage = await db.CampaignMessage.findByIdAndUpdate(
      { _id: campaignMessageCollectionId },
      {
        $set: {
          message: message,
        },
      },
      { new: true }
    );

    returnData = {
      status: true,
      message: "Campaign message updated successfully",
      data: updatedCampaignMessage,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteCampaignMessage = async (req, res, next) => {
  try {
    var returnData;
    const { campaignMessageCollectionId } = req.body;
    const deletedMessage = await db.CampaignMessage.findByIdAndUpdate(
      { _id: campaignMessageCollectionId },
      {
        $set: {
          isDeleted: true,
        },
      },
      { new: true }
    );

    returnData = {
      status: true,
      message: "Campaign message deleted successfully",
      data: deletedMessage,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

// Campaign Dos
exports.getCampaignDo = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId } = req.body;

    const campaignDos = await db.CampaignDo.find(
      {
        campaignId: campaignId,
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
      message: "Campaign dos fetched successfully",
      data: campaignDos,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.addCampaignDo = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId, doMessage } = req.body;

    const newCampaignDo = new db.CampaignDo({
      campaignId: campaignId,
      doMessage: doMessage,
    });
    await newCampaignDo.save();

    returnData = {
      status: true,
      message: "Campaign Do added successfully",
      data: newCampaignDo,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.updateCampaignDo = async (req, res, next) => {
  try {
    var returnData;
    const { campaignDoCollectionId, doMessage } = req.body;

    const updatedCampaignDo = await db.CampaignDo.findByIdAndUpdate(
      { _id: campaignDoCollectionId },
      {
        $set: {
          doMessage: doMessage,
        },
      },
      { new: true }
    );

    returnData = {
      status: true,
      message: "Campaign Do updated successfully",
      data: updatedCampaignDo,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteCampaignDo = async (req, res, next) => {
  try {
    var returnData;
    const { campaignDoCollectionId } = req.body;
    const deletedDo = await db.CampaignDo.findByIdAndUpdate(
      { _id: campaignDoCollectionId },
      {
        $set: {
          isDeleted: true,
        },
      },
      { new: true }
    );

    returnData = {
      status: true,
      message: "Campaign Do deleted successfully",
      data: deletedDo,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Campaign Donts
exports.getCampaignDont = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId } = req.body;

    const campaignDonts = await db.CampaignDont.find(
      {
        campaignId: campaignId,
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
      message: "Campaign donts fetched successfully",
      data: campaignDonts,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.addCampaignDont = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId, dontMessage } = req.body;

    const newCampaignDont = new db.CampaignDont({
      campaignId: campaignId,
      dontMessage: dontMessage,
    });
    await newCampaignDont.save();

    returnData = {
      status: true,
      message: "Campaign Dont added successfully",
      data: newCampaignDont,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.updateCampaignDont = async (req, res, next) => {
  try {
    var returnData;
    const { campaignDontCollectionId, dontMessage } = req.body;

    const updatedCampaignDont = await db.CampaignDont.findByIdAndUpdate(
      { _id: campaignDontCollectionId },
      {
        $set: {
          dontMessage: dontMessage,
        },
      },
      { new: true }
    );

    returnData = {
      status: true,
      message: "Campaign Dont updated successfully",
      data: updatedCampaignDont,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteCampaignDont = async (req, res, next) => {
  try {
    var returnData;
    const { campaignDontCollectionId } = req.body;
    const deletedDont = await db.CampaignDont.findByIdAndUpdate(
      { _id: campaignDontCollectionId },
      {
        $set: {
          isDeleted: true,
        },
      },
      { new: true }
    );

    returnData = {
      status: true,
      message: "Campaign Dont deleted successfully",
      data: deletedDont,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.finalizeCampaign = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId } = req.body;

    const updatedCampaign = await db.Campaign.findByIdAndUpdate(
      { _id: campaignId, isDeleted: false },
      {
        $set: {
          status: "Campaign Finalized",
        },
      },
      { new: true }
    );

    const memers = await db.CampaignMemer.find(
      {
        campaignId: campaignId,
        isDeleted: false,
      },
      {
        isDeleted: false,
        createdAt: false,
        updatedAt: false,
        __v: false,
      }
    ).populate({
      path: "memer",
      match: { isDeleted: false },
      select: {
        firstName: true,
        lastName: true,
        price: true,
        picture: true,
        approvedMemes: true,
      },
    });

    let totalPayableAmount = memers.reduce(function (
      totalAmount,
      memerDetails
    ) {
      return totalAmount + memerDetails.quantity * memerDetails.memer.price;
    },
    0);

    const paymentDetails = new db.CampaignPayment({
      campaignId: campaignId,
      amount: totalPayableAmount,
    });
    await paymentDetails.save();

    returnData = {
      status: true,
      message: "Campaign Finalized successfully",
      data: updatedCampaign,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.campaignPrice = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId } = req.body;

    const campaignPrice = await db.CampaignPayment.findOne(
      { campaignId: campaignId, isDeleted: false },
      { amount: true }
    );

    if (!campaignPrice) {
      returnData = {
        status: true,
        message: "Campaign has not been finalized yet!",
        data: {},
      };
    } else {
      returnData = {
        status: true,
        message: "Campaign price fetched successfully",
        data: campaignPrice,
      };
    }

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.uploadPO = async (req, res, next) => {
  try {
    var returnData;
    const { campaignId, fileName } = req.body;

    const updatedCampaign = await db.CampaignPayment.findOneAndUpdate(
      { campaignId: campaignId, isDeleted: false },
      {
        $set: {
          paymentfileName: fileName,
        },
      },
      { new: true }
    );

    console.log(req.payload);

    await db.Campaign.findByIdAndUpdate(campaignId, {
      status: req.payload.userType == 3 ? "PO Approved" : "PO Submitted",
    })

    if (!updatedCampaign) {
      returnData = {
        status: true,
        message: "Campaign has not been finalized yet!",
        data: {},
      };
    } else {
      returnData = {
        status: true,
        message: "Campaign PO uploaded successfully",
        data: updatedCampaign,
      };
    }

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};
