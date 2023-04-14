const bcrypt = require('bcryptjs');
const db = require('../../../NOSQL/database/mongodb');
const { OK, ERROR } = require('../../../../utils/responseHelper');

const getAdmins = async (req, res) => {
  try {

    const existentUser = await db.Admin.find({});

    if (!existentUser) {
        return OK(res,null,'No list to show.');
    }
    return OK(res,existentUser,'Success.');

  } catch (err) {
    return ERROR(res, null, err.message);
  }
};

const getMemers = async (req,res) =>{
  try {

    const findMemers = await db.Memer.find({ isDeleted: false });

    if (!findMemers) {
        return OK(res,null,'No list to show.');
    }
    return OK(res,findMemers,'Success.');

  } catch (err) {
    return ERROR(res, null, err.message);
  }
}
const getCampaigns = async (req,res) =>{
  try {

    const findCampaign = await db.Campaign.find({ isDeleted: false })
    .populate('campaignMemer').exec();

    if (!findCampaign) {
        return OK(res,null,'No list to show.');
    }
    return OK(res,findCampaign,'Success.');

  } catch (err) {
    return ERROR(res, null, err.message);
  }
}


  module.exports = {getAdmins,getMemers,getCampaigns};