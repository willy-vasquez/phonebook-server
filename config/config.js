require('dotenv').config();

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URI;
const MONGO_PASSWD = process.env.MONGO_PWD;

module.exports = {
  PORT,
  MONGO_URL,
  MONGO_PASSWD,
};
