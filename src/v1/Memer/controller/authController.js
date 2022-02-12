const { validationResult } = require("express-validator");
const db = require("../../../NOSQL/database/mongodb");
const v = require("../../validators/validator");
const { GenerateToken } = require("../../functions/reusableFunctions");

exports.register = async (req, res, next) => {
  try {
    let returnData;
    const { email, phoneNo } = req.body;

    const memer = await db.Memer.findOne({
      $or: [{ email: email }, { phoneNo: phoneNo }],
    });

    if (memer) {
      let message;
      if (memer.isDeleted) {
        await memer.update({
          $set: { isDeleted: false },
        });
        message = "Memer registered successfully";
      } else {
        message =
          "A memer is already registered with this phone number or email ID";
      }
      returnData = {
        status: false,
        message: message,
        data: memer,
      };
    } else {
      const newMemer = new db.Memer(req.body);
      await newMemer.save();

      const newMemerAccountDetails = new db.MemerAccountDetails({
        memerId: newMemer._id,
        ...req.body,
      });
      await newMemerAccountDetails.save();

      const tagList = req.body.tagList.map((e) => {
        return {
          memerId: newMemer._id,
          tagId: e.tagId,
        };
      });
      await db.MemerTag.insertMany(tagList);

      const secureToken = GenerateToken(newMemer);
      const tokenData = {
        memerId: newMemer._id,
        secureToken: secureToken,
      };

      returnData = {
        status: true,
        message: "Memer registered successfully",
        data: tokenData,
      };
    }
    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { phoneNo } = req.body;
    const memer = await db.Memer.findOne({ phoneNo: phoneNo }).populate({
      path: "memerAccountDetails",
    });
    let returnData = {};

    if (memer) {
      const secureToken = GenerateToken(memer);

      const memerData = {
        firstName: memer.firstName,
        lastName: memer.lastName,
        dob: memer.dob,
        email: memer.email,
        phoneNo: memer.phoneNo,
        picture: memer.picture,
        accountType: memer.memerAccountDetails.accountType,
        accountName: memer.memerAccountDetails.accountName,
        ifscCode: memer.memerAccountDetails.ifscCode,
        accountNumber: memer.memerAccountDetails.accountNumber,
        memerId: memer._id,
        secureToken: secureToken,
        isRegistered: true,
      };

      returnData = {
        status: true,
        message: "Memer logged in successfully",
        data: memerData,
      };
    } else {
      const memerData = {
        isRegistered: false,
      };

      returnData = {
        status: true,
        message: "Unable to find any memer registered with this phone number",
        data: memerData,
      };
    }
    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
