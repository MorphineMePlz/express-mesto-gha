const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      validate: {
        validator(url) {
          return validator.isURL(url);
        },
        message: 'URL validation error',
      },
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(value) {
          return validator.isEmail(value);
        },
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
