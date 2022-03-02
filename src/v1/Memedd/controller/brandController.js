const { validationResult } = require("express-validator");
const db = require("../../../NOSQL/database/mongodb");
const v = require("../../validators/validator");
const { GetById, GenerateToken } = require("../../functions/reusableFunctions");

exports.getBrands = async (req, res, next) => {
  try {
    let returnData;
    const brands = await db.Brand.find(
      { brandUserId: req.payload._id, isDeleted: false },
      {
        brandName: true,
        website: true,
        logo: true,
        brandLogo: true,
        description: true,
      }
    );
    returnData = {
      status: true,
      message: "Brands fetched successfully",
      data: brands,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.addBrand = async (req, res, next) => {
  try {
    var returnData;
    const { brandName, description, website, brandLogo } = req.body;
    const brandUserId = req.payload._id;

    const brand = await db.Brand.findOne({
      $and: [{ brandUserId: brandUserId }, { brandName: brandName }],
    });

    if (brand) {
      let message;
      if (brand.isDeleted) {
        await brand.update({
          $set: { isDeleted: false },
        });
        message = "Brand added successfully";
      } else {
        message = "This brand name is already registered";
      }
      return res.status(200).json({
        status: false,
        message: message,
        data: brand,
      });
    } else {
      const newBrand = new db.Brand({
        brandName: brandName,
        description: description,
        website: website,
        brandLogo: brandLogo,
        brandUserId: brandUserId,
      });
      await newBrand.save();

      const tokenData = {
        brandName: brandName,
        description: description,
        website: website,
        // brandLogo: brandLogo,
      };

      returnData = {
        status: true,
        message: "Brand added successfully",
        data: tokenData,
      };
    }
    const returnStr = JSON.stringify(returnData);

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.addBrandMemerGroups = async (req, res, next) => {
  try {
    var returnData;
    const { name, description } = req.body;
    const brandUserId = req.payload._id;

    const memerGroup = await db.BrandMemerGroup.findOne({
      $and: [{ brandUserId: brandUserId }, { name: name }],
    });

    if (memerGroup) {
      let message;
      if (memerGroup.isDeleted) {
        await memerGroup.update({
          $set: { isDeleted: false },
        });
        message = "Brand Memer Group added successfully";
      } else {
        message = "This brand memer group name is already registered";
      }
      return res.status(200).json({
        status: true,
        message: message,
        data: memerGroup,
      });
    } else {
      const newBrandMemerGroup = new db.BrandMemerGroup({
        name: name,
        description: description,
        brandUserId: brandUserId,
      });
      await newBrandMemerGroup.save();

      returnData = {
        status: true,
        message: "Brand memer group added successfully",
        data: newBrandMemerGroup,
      };
    }

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deleteBrandMemerGroups = async (req, res, next) => {
  try {
    var returnData;
    const { brandMemerGroupCollectionId } = req.body;

    const memerGroup = await db.BrandMemerGroup.findByIdAndUpdate(
      { _id: brandMemerGroupCollectionId },
      {
        $set: {
          isDeleted: true,
        },
      }
    );

    returnData = {
      status: true,
      message: "Brand memer group removed successfully",
      data: memerGroup,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getBrandMemerGroups = async (req, res, next) => {
  try {
    var returnData;

    const memerGroups = await db.BrandMemerGroup.find(
      { brandUserId: req.payload._id, isDeleted: false },
      { description: true, name: true }
    );

    returnData = {
      status: true,
      message: "Brand memer groups fetched successfully",
      data: { memerGroups: memerGroups },
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.addMemerToBrandGroup = async (req, res, next) => {
  try {
    var returnData;
    const { memerId, brandGroupId } = req.body;

    const memer = await db.BrandGroupMemer.findOne({
      $and: [{ memerId: memerId }, { brandGroupId: brandGroupId }],
    });

    if (memer) {
      let message;
      if (memer.isDeleted) {
        await memer.update({
          $set: { isDeleted: false },
        });
        message = "Memer added to brand group successfully";
      } else {
        message = "Memer is already added to brand group";
      }
      return res.status(200).json({
        status: false,
        message: message,
        data: memer,
      });
    } else {
      const memer = new db.BrandGroupMemer({
        memerId: memerId,
        brandGroupId: brandGroupId,
      });
      await memer.save();

      returnData = {
        status: true,
        message: "Memer added to brand group successfully",
        data: memer,
      };
    }

    return res.status(200).json(returnData);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.removeMemerFromBrandGroup = async (req, res, next) => {
  try {
    var returnData;
    const { brandGroupMemerCollectionId } = req.body;

    const memer = await db.BrandGroupMemer.findByIdAndUpdate(
      { _id: brandGroupMemerCollectionId },
      {
        $set: {
          isDeleted: true,
        },
      }
    );

    returnData = {
      status: true,
      message: "memer removed from brand group successfully",
      data: memer,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getBrandGroupMemers = async (req, res, next) => {
  try {
    var returnData;
    const { brandGroupId } = req.body;
    const memers = await db.BrandGroupMemer.find(
      {
        brandGroupId: brandGroupId,
        isDeleted: false,
      },
      { isDeleted: false, createdAt: false, updatedAt: false, __v: false }
    ).populate({
      path: "memer",
      match: { isDeleted: false },
      select: {
        firstName: true,
        lastName: true,
        picture: true,
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
      message: "Brand group memers fetched successfully",
      data: { memers: memers },
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.updateFCMToken = async (req, res, next) => {
  try {
    var returnData;
    const { fcmToken } = req.body;

    await db.BrandUser.updateOne({ _id: req.payload._id }, { $set: req.body });

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

exports.getMemer = async (req, res, next) => {
  try {
    var returnData;
    const { memerId } = req.body;
    const memer = await db.Memer.findById(
      {
        _id: memerId,
        isDeleted: false,
      },
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
      message: "Memer fetched successfully",
      data: memer,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getMemerMemes = async (req, res, next) => {
  try {
    var returnData;
    const { memerId } = req.body;
    const featuredMemes = await db.FeaturedMeme.find(
      {
        memerId: memerId,
        isDeleted: false,
      },
      {
        name: true,
        picture: true,
        filetype: true,
      }
    );
    let memes = {};
    memes.featured = featuredMemes;
    memes.similarMemersList = [];

    returnData = {
      status: true,
      message: "Featured memes fetched successfully",
      data: memes,
    };

    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};
