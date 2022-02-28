const { validationResult } = require("express-validator");
const db = require("../../../NOSQL/database/mongodb");
const v = require("../../validators/validator");
const { GetById, GenerateToken } = require("../../functions/reusableFunctions");

exports.getTags = async (req, res, next) => {
  try {
    var returnData;
    const tags = await db.Tag.aggregate([
      {
        $project: {
          _id: false,
          tagId: "$_id",
          name: true,
        },
      },
    ]);
    if (tags) {
      returnData = {
        status: true,
        message: "Tag list fetched successfully",
        data: {
          tags: tags
        },
      };
    } else {
      returnData = {
        status: true,
        message: "No tags found",
        data: {},
      };
    }

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.addTag = async (req, res, next) => {
  try {
    var returnData;
    const { name } = req.body;
    const tags = await db.Tag.findOne({ name: name });

    if (!tags) {
      const newTag = await db.Tag(req.body);
      await newTag.save();

      returnData = {
        status: true,
        message: "Tag added successfully",
        data: newTag,
      };
    } else {
      returnData = {
        status: true,
        message: "Tag already present",
        data: {},
      };
    }

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};
