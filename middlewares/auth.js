const jsonwebtoken = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;
  let payload;
  try {
    payload = jwt.verify(jsonwebtoken, 'some-secret-key');
  } catch (err) {
    return next(new UnauthorizedError('Ошибка авторизации. Токен недоступен'));
  }

  req.user = payload;

  return next();
};
