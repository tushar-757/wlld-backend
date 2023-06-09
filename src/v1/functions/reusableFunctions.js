/* eslint-disable no-console */
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: Number(process.env.SMTP_PORT) || 2465,
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * GET RECORD BASED ON ON MODEL NAME, NAME OF THE ID AND ID
 * @param {object} modelName name of the model from sequelize
 * @param {string} idName name of the field which the id belongs to
 * @param {number} id id of the record whose data you want to get
 * @returns
 */
exports.GetById = async (modelName, idName, id, include = []) => {
  const data = await modelName.findOne({
    where: {
      [idName]: id,
      isDeleted: 0,
    },
    include,
  });

  return data;
};

/**
 * GET RECORD BASED ON ON MODEL NAME, NAME OF THE ID AND ID
 * @param {object} modelName name of the model from sequelize
 * @param {string} idName name of the field which the id belongs to
 * @param {number} id id of the record whose data you want to get
 * @returns
 */
exports.GetAllById = async (modelName, idName, id, include = []) => {
  const data = await modelName.findAll({
    where: {
      [idName]: id,
      isDeleted: 0,
    },
    include,
  });

  return data;
};

/**
 * GET ALL RECORDS BASED ON ON MODEL NAME
 * @param {object} modelName name of the model from sequelize
 * @returns
 */
exports.GetAll = async (modelName, include = []) => {
  const data = await modelName.findAll({
    where: {
      isDeleted: 0,
    },
    include,
  });

  return data;
};

/**
 * GENERATE JWT TOKEN FOR AUTHENTICATION
 * @param {*} user user data
 * @returns TOKEN
 */
exports.GenerateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      price: user.price,
      phoneNo: user.phoneNo,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userType: user.userType ?? 1
    },
    process.env.SECRET,
    {
      expiresIn: "48h",
    }
  );

  return token;
};

exports.GenerateTicket = (count = 6) => {
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nanoid = customAlphabet(alphabet, count);

  return nanoid();
};

exports.sendMail = async (emailTo, subject, text, html, file) => {
  try {
    const defaultMailOption = {
      from: "",
      to: emailTo,
      subject,
      text,
      html,
    };
    let mailOption = {};
    if (file) {
      mailOption = {
        ...defaultMailOption,
        attachments: [
          {
            filename: "receipt",
            path: file,
          },
        ],
      };
    } else {
      mailOption = {
        ...defaultMailOption,
      };
    }
    const resp = await transporter.sendMail(mailOption);
    console.log(resp);
  } catch (err) {
    console.log(err);
  }
};
