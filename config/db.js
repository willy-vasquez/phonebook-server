const mongoose = require('mongoose');
const process = require('process');

mongoose.set('strictQuery', false);

let url = process.env.MONGO_URI;
const password = process.env.MONGO_PWD;
url = url.replace('MONGO_PASSWORD', password);
console.log('connecting to MongoDB');

const connectDB = async () => {
  await mongoose
    .connect(url)
    .then(() => console.log('connected to mongoDB'))
    .catch((error) => console.log(error.message));
};

module.exports = connectDB;
