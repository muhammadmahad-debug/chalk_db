require('dotenv').config()
const mongoose = require('mongoose')

const connectDB = async () => {
  let a =
    'mongodb+srv://hassanuet475:12345@stripe.7tkbit3.mongodb.net/stripe?retryWrites=true&w=majority'
  try {
    await mongoose.connect(a, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    console.log('mongodb connection success!')
  } catch (err) {
    console.log('mongodb connection failed!', err.message)
  }
}

module.exports = {
  connectDB,
}

