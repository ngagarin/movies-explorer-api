const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { UnauthorizedError } = require('../utils/errors/index');
const emailValidator = require('../validations/emailValidator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator: emailValidator,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError('Неправильные почта или пароль'));
          }
          return Promise.resolve(user);
        });
    });
};

module.exports = mongoose.model('user', userSchema);