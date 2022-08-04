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
    phoneNumber: {
       type: String,
       unique: true,
       required: [true, 'Please provide phone number'],
       minlength: 11,
       maxlength: 11,
       validate: {
          validator: validator.phoneNumber,
          message: 'Please provide valid phone number starting with 0',
       },
    }, 
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  });



  module.exports = mongoose.model('User', UserSchema);

