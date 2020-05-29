const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const User = mongoose.plugin(uniqueValidator).model('User', {
  username: {
    type: String,
    required: true,
    unique: true,
    validate: value => /^[a-z\.0-9_-]{3,18}$/m.test(value),
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 65,
  },
  balance: {
    type: Number,
    default: 0,
  },
  paymentOperations: {
    type: Array,
    default: [],
  }
});

module.exports.User = User;
