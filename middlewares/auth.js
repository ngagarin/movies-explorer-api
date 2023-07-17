const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/errors/unauthorized-error');
const { NODE_ENV, JWT_SECRET } = require('../utils/config');
const { NOT_AUTHORIZED_MSG } = require('../utils/constants');

const validateToken = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (e) {
    return next(new UnauthorizedError(NOT_AUTHORIZED_MSG));
  }

  req.user = payload;
  return next();
};

module.exports = {
  validateToken,
};
