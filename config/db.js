const mongoose = require("mongoose");
require('dotenv').config();

const connectDB = async (req, res) => {
  try {
    const URI = process.env.MONGO_URL;
    await mongoose.connect(URI);
    console.log("DB connected.");
  } catch (error) {
    console.log(error || error?.message);
  }
};

module.exports = connectDB;