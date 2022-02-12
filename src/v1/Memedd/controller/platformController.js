const { validationResult } = require("express-validator");
const db = require("../../../NOSQL/database/mongodb");
const v = require("../../validators/validator");
const { GetById, GenerateToken } = require("../../functions/reusableFunctions");

exports.getPlatformFormats = async (req, res, next) => {
  try {
    let returnData;
    const platformFormats = await db.Platform.find(
      { isDeleted: false },
      { isDeleted: false }
    ).populate({
      path: "platformFormat",
      match: { isDeleted: false },
      select: {
        name: true,
        description: true,
      },
    });

    returnData = {
      status: true,
      message: "Platform formats fetched successfully",
      data: platformFormats,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
