const bcrypt = require('bcryptjs');
const db = require('../../../NOSQL/database/mongodb');
const { OK,UNAUTHORIZED, ERROR } = require('../../../../utils/responseHelper');

const signUp = async (req, res) => {
  try {
    const { email,username,password } = req.body;
    const existentUser = await db.Admin.findOne({ username });

    if (!existentUser) {
      const hashPassword = await bcrypt.hash(password, 8);
      const userResponse = await db.Admin.create({
        email,
        username,
        password: hashPassword,
      });

      userResponse.GenerateAuthToken();
      return OK(res,userResponse,'Success.');
    } else {
      return ERROR(res, null, 'user already exist!  do you want to login instead?');
    }
  } catch (err) {
    return ERROR(res, null, err.message);
  }
};


const login = async (req, res) => {
    const { username, password } = req.body;

    try {
      const findUser = await db.Admin.findOne({ username });

      if (!findUser) {
        return UNAUTHORIZED(res, null, 'check your credentials');
      }
      const checkPassword = await bcrypt.compare(password, findUser.password);
      if (findUser && checkPassword) {
        findUser.GenerateAuthToken();
        return OK(res,findUser);
      } else {
        return UNAUTHORIZED(res, null, 'Email or Password does not match!');
      }
    } catch (e) {
      return ERROR(res, null, e?.message);
    }
  };
  module.exports = {signUp,login};