const { celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const validator = require('validator');

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

module.exports.validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

module.exports.validateAvatarUpdate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom((value) => {
        if (!validator.isURL(value)) {
          throw new Error('Ошибка валидации. Введён не URL');
        }
        return value;
      }),
  }),
});

module.exports.validateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .required()
      .custom((value) => {
        if (!mongoose.Schema.Types.ObjectId.isValid(value)) {
          throw new Error('Ошибка валидации. Некорректный ID');
        }
        return value;
      }),
  }),
});

module.exports.validateCardCreation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string()
      .required()
      .custom((value) => {
        if (!validator.isURL(value)) {
          throw new Error('Ошибка валидации. Введён не URL');
        }
        return value;
      }),
  }),
});

module.exports.validateCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .required()
      .custom((value) => {
        if (!mongoose.Schema.Types.ObjectId.isValid(value)) {
          throw new Error('Ошибка валидации. Некорректный ID');
        }
        return value;
      }),
  }),
});
