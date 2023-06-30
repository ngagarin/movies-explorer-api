require('dotenv').config();
const rateLimit = require('express-rate-limit');

const PORT = process.env.PORT || 3100;
const NODE_ENV = process.env.NODE_ENV;
const JWT_SECRET = process.env.JWT_SECRET;
const DB_URL = process.env.DB_URL;

const LIMITER = rateLimit({
  max: 500,
  windowMs: 15 * 60 * 1000,
  message: 'Превышено ограничение количества запросов. Пожалуйста, повторите попытку позже.',
});

const CORS_DATA = {
  credentials: true,
  origin: ['https://diplom.nomoreparties.sbs', 'http://localhost:3101'],
  maxAge: 60,
};

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  DB_URL,
  LIMITER,
  CORS_DATA,
};
