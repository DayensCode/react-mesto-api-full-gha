const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-error');
const { JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('You need to log in'));
  }
  const token = authorization.replace('Bearer ', '');
  try {
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(UnauthorizedError('You need to log in'));
  }
  req.user = payload;
  return next();
};
