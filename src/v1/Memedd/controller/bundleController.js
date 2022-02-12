const { validationResult } = require("express-validator");
const db = require("../../../NOSQL/database/mongodb");
const v = require("../../validators/validator");
const { GetById, GenerateToken } = require("../../functions/reusableFunctions");

exports.getBundle = async (req, res, next) => {
  try {
    let returnData;
    const { bundleId } = req.body;

    const bundle = await db.Bundle.findById(bundleId);

    returnData = {
      status: true,
      message: "Bundle fetched successfully",
      data: bundle,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getBundleMemers = async (req, res, next) => {
  try {
    var returnData;
    const { bundleId } = req.body;
    const memers = await db.BundleMemer.find({
      bundleId: bundleId,
      isDeleted: false,
    }).populate({
      path: "memer",
      match: { isDeleted: false },
      select: {
        firstName: true,
        lastName: true,
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
      message: "Bundle memers fetched successfully",
      data: memers,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getAllBundles = async (req, res, next) => {
  try {
    let returnData;
    const bundles = await db.Bundle.find(
      { isDeleted: false },
      {
        name: true,
        picture: true,
        budget: true,
        memerCount: true,
      }
    ).populate({
      path: "bundleTag",
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
      message: "Bundles fetched succesfully",
      data: bundles,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
