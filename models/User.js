const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 6,
    },
    phoneNunber: {
       type: String,
       required: [true, 'Please provide phone number'],
       validate: {
          validator: validator.phoneNunber,
          message: 'Please provide valid phone number',
       },
    }, 
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  });



  module.exports = mongoose.model('User', UserSchema);

