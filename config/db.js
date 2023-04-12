const mongoose = require('mongoose');
const config = require('./config');

mongoose.set('strictQuery', false);

let url = config.MONGO_URL;
const password = config.MONGO_PASSWD;
url = url.replace('MONGO_PASSWORD', password);
console.log('connecting to MongoDB');

const connectDB = async () => {
  await mongoose
    .connect(url)
    .then(() => console.log('connected to mongoDB'))
    .catch((error) => console.log(error.message));
};

module.exports = connectDB;
