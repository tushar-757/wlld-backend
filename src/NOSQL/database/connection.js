const mongoose = require("mongoose");
const config = require("../../../config/config");

mongoose
  .connect(config.NOSQL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Connection Failed", err);
  });

module.exports = mongoose;
