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

exports.approveMeme = async (req, res, next) => {
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
