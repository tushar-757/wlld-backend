const { validationResult } = require("express-validator");
const db = require("../../../NOSQL/database/mongodb");
const v = require("../../validators/validator");
const { GenerateToken } = require("../../functions/reusableFunctions");

exports.register = async (req, res, next) => {
  try {
    const {
      email,
      phoneNo,
      companyName,
      brandName,
      description,
      website,
      firstName,
      lastName,
      firebaseToken,
      companyLogo,
      fcmToken,
    } = req.body;

    const brandUser = await db.BrandUser.findOne({
      $or: [{ email: email }, { phoneNo: phoneNo }],
    });

    // check if user already registered with same phone and email ID
    if (brandUser) {
      let message;
      if (brandUser.isDeleted) {
        await brandUser.update({
          $set: { ...req.body, isDeleted: false },
        });
        message = "BrandUser registered successfully";
      } else {
        message =
          "A BrandUser is already registered with this phone number or Email ID";
      }
      return res.status(200).json({
        status: false,
        message: message,
        data: {
          user: brandUser,
        },
      });
    } else {
      // here for the company logo, we can search it in the files table
      // and use it while we create the brand
      // RIGHT NOW companyLogo field has been omitted

      // register the user of this new brand
      const brandUser = await new db.BrandUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNo: phoneNo,
        firebaseToken: firebaseToken,
        fcmToken: fcmToken,
        userType: 1,
      });
      await brandUser.save();

      // register new brand
      const newBrand = await new db.Brand({
        companyName: companyName,
        brandName: brandName,
        description: description,
        website: website,
        brandUserId: brandUser._id,
        brandLogo: companyLogo,
      });
      await newBrand.save();

      const secureToken = GenerateToken(brandUser);

      const tokenData = {
        brandId: newBrand._id,
        secureToken: secureToken,
      };

      return res.status(200).json({
        status: true,
        message: "Brand registered successfully",
        data: {
          token: tokenData,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { phoneNo, firebaseToken } = req.body;
    const brandUser = await db.BrandUser.findOne({ phoneNo: phoneNo }).populate(
      {
        path: "brand",
        // match: { isDeleted: false },
      }
    );
    let returnData = {};
    if (brandUser) {
      const secureToken = GenerateToken(brandUser);

      const brandData = {
        _id: brandUser._id,
        companyName: brandUser.companyName,
        brandName: brandUser.brandName,
        description: brandUser.description,
        website: brandUser.website,
        // companyLogo: brandUser.companyLogo,
        firstName: brandUser.firstName,
        lastName: brandUser.lastName,
        email: brandUser.email,
        phoneNo: brandUser.phoneNo,
        brandId: brandUser.brandId,
        secureToken: secureToken,
      };

      returnData = {
        status: true,
        message: "Brand logged in successfully",
        data: {
          user: brandData,
          isRegistered: true,
        },
      };
    } else {
      returnData = {
        status: true,
        message: "Unable to find any brand registered with this phone number",
        data: {
          isRegistered: false,
        },
      };
    }
    return res.status(200).json(returnData);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.checkEmail = async (req, res, next) => {
  try {
    const {
      email,
    } = req.body;

    const brandUser = await db.BrandUser.findOne({
       email: email,
    });

    // check if user already registered with same phone and email ID
    if (brandUser) {
      return res.status(200).json({
        status: false,
        message: "Email is already register!!!",
        data: {
          exist: true,
        }
      });
    } else {

      return res.status(200).json({
        status: true,
        message: "Email is good to register",
        data: {
          exist: false,
        }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};