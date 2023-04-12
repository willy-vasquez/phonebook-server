require('dotenv').config();
const process = require('process');

const PORT = process.env.PORT || 3002;

module.exports = {
  PORT,
};
