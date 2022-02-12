/* eslint-disable no-unused-vars */
const errorMiddleware = (err, req, res, next) => {
  // for development
  if (process.env.NODE_ENV === "DEV ") {
    res.status(400).json({
      code: 1,
      error: err.err,
      message: err.err.message,
    });

    // for production
  } else if (process.env.NODE_ENV === "PROD") {
    res.status(400).json({
      code: 1,
      error: err.err,
      message: err.err.message,
    });
  }
};

module.exports = errorMiddleware;
