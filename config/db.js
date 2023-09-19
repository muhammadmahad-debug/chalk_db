require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  let a = process.env.MONGO_URI;
  try {
    await mongoose.connect(a, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("mongodb connection success!");
  } catch (err) {
    console.log("mongodb connection failed!", err.message);
  }
};

module.exports = {
  connectDB,
};
