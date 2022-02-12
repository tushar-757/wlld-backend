const config = {
  development: {
    SQL: "",
    NOSQL: process.env.MONGODB_URL,
  },
  production: {
    SQL: "",
    NOSQL: process.env.MONGODB_URL,
  },
};

const configData =
  process.env.NODE_ENV === "DEV " ? config.development : config.production;

module.exports = configData;
