const { INTERNAL_ERROR_MSG } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).json({
    message: statusCode === 500 ? INTERNAL_ERROR_MSG : message,
  });
  next();
};

module.exports = {
  errorHandler,
};
