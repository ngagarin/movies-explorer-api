require('dotenv').config();

const { PORT } = process.env;
const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env;
const { BITFILMSDB } = process.env;

const CORS_DATA = {
  credentials: true,
  origin: ['https://diplom.nomoreparties.sbs', 'http://localhost:3101'],
  maxAge: 60,
};

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  BITFILMSDB,
  CORS_DATA,
};
