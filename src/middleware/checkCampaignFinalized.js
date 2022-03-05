const db = require("../NOSQL/database/mongodb");

module.exports = async (req, res, next) => {
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
    );

    if (campaignData.status.includes("Finalized")) {
      res.status(200).json({
        code: 200,
        result: [],
        message: "Campaign is already finalized and cannot be updated!",
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      code: 401,
      result: [],
      message: "No such campaign is present!",
    });
  }
};
