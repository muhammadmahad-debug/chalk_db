const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    isDeleted:
    {
        type:Boolean,
        default:false
    }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
