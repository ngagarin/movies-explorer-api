const rateLimit = require('express-rate-limit');
const { REQUEST_LIMITED_MSG } = require('./constants');

const limiter = rateLimit({
  max: 500,
  windowMs: 15 * 60 * 1000,
  message: REQUEST_LIMITED_MSG,
});

module.exports = {
  limiter,
};
