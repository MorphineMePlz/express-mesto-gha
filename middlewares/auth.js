const jwt = require('jsonwebtoken');
const UnauthorizedError = require("../errors/UnauthorizedError")
const NotFoundError = require("../errors/NotFoundError")


const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new NotFoundError('Ошибка авторизации. Токен недоступен');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret');
  } catch (err) {
    throw new UnauthorizedError('Ошибка авторизации. Токен не прошёл проверку');
  }
  req.user = payload;
  return next();
};