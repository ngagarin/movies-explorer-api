const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  max: 500,
  windowMs: 15 * 60 * 1000,
  message: 'Превышено ограничение количества запросов. Пожалуйста, повторите попытку позже.',
});

module.exports = {
  limiter,
};
