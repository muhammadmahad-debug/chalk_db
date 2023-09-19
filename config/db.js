require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  let a =
    "mongodb+srv://vercel-admin-user:P7GbE6JuVYIQJz6Y@cluster0.1x4m3es.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
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
