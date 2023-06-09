const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    if(!token){
       token = req.headers.authorization;
    }
    jwt.verify(token, process.env.SECRET);

    req.payload = jwt.verify(
     token,
      process.env.SECRET
    );
    next();
  } catch (error) {
    res
      .status(401)
      .json({ code: 401, result: [], message: "Token not verified!" });
  }
};
