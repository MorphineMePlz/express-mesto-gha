const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const token = req.cookies;
  console.log(token);
  if (!token) {
    next(new UnauthorizedError('Ошибка авторизации'));
    return;
  }

  let payload;

  try {
    payload = jwt.verify(token, 'super-strong-secret');
  } catch (err) {
    next(new UnauthorizedError('Ошибка авторизации'));
    return;
  }

  req.user = payload;

  next();
};
