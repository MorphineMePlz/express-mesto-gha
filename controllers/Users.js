// eslint-disable-next-line import/no-unresolved
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const jwt = require('jsonwebtoken');
// eslint-disable-next-line import/no-unresolved
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require("../errors/UnauthorizedError")

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError('Список пользователей не найден');
      }
      res.status(200).send(users);
    })
    .catch(next);
};

module.exports.getUsersById = (req, res, next) => {
  User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      throw new NotFoundError('Пользователь с таким ID не найден');
    }
    res.status(200).send(user);
  })
  .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  return User.findOne({ email })
    .then((user) => {
      if (user) return next(new ConflictError('Ошибка регистрации. Данный email уже существует'));
      bcrypt.hash(password, 10)
        .then((hash) => {
          User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
          })
            .then((user) => {
              User.findById(user._id)
                .then((user) => res.status(200).send(user));
            })
            .catch((err) => {
              if (err.name === 'ValidationError') {
                next(new BadRequestError('Введены некорректные данные'));
              } else if (err.code === 11000) {
                next(new ConflictError(`${email} уже используется`));
              } else {
                next(err);
              }
            });
        });
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
  .then((user) => {
    if (!user) {
      throw new BadRequestError('Введены некорректные данные');
    }
    res.status(200).send(user);
  })
  .catch(next);
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
  .orFail(new Error('CastError'))
  .then((user) => {
    if (!user) {
      throw new BadRequestError('Введены некорректные данные');
    }
    res.status(200).send(user);
  })
  .catch(next);
};


module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
  .then((user) => {
   const token = jwt.sign({ _id: user._id }, 'super-strong-secret',
  { expiresIn: "7d" });
    res.cookie('jwt', token, { maxAge: 3600000, httpOnly: true, sameSite: true });
    res.send({ token });
  })
  .catch((err) => {
    if (err.message === 'IncorrectEmail') {
      return next(new UnauthorizedError('Неправильные почта или пароль'));
    }
    next(err);
  });
};

 module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с данным ID не найден');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

