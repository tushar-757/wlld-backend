/* eslint-disable no-unused-vars */
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

// env
const dotenv = require("dotenv");

dotenv.config({ path: "./config/config.env" });

const errorMiddleware = require("./src/middleware/error");

global.__basedir = __dirname;

// database connection
require("./src/NOSQL/database/mongodb");

const app = express();

// Memedd app API routes
const {
  apiAuth, // this authentication is for a Brand User
  apiBrand,
  apiBundle,
  apiTag,
  apiCampaign,
  apiMeme,
  apiPlatform,
} = require("./src/v1/Memedd/routes/api");

// Memer app API routes
const {
  apiMemerAuth, // this authentication is for a Memers
  apiMemer,
} = require("./src/v1/Memer/routes/api");

app.use(helmet());
app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders(res, _path, stat) {
      res.set("x-timestamp", Date.now().toString());
    },
  })
);
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Memedd app API routes
app.use("/app/branduser/auth", apiAuth);
app.use("/app/brand", apiBrand);
app.use("/app/bundle", apiBundle);
app.use("/app/tag", apiTag);
app.use("/app/campaign", apiCampaign);
app.use("/app/meme", apiMeme);
app.use("/app/platform", apiPlatform);

// Memer app API routes
app.use("/app/memer/auth", apiMemerAuth);
app.use("/app/memer", apiMemer);

app.use(errorMiddleware);

app.use((req, res, next) => {
  res.json({
    status: false,
    message: "Invalid Api.",
  });
});

module.exports = app;
