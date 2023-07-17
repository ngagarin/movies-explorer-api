require('dotenv').config();

const { PORT = 3000 } = process.env;
const { NODE_ENV } = process.env;
const { JWT_SECRET } = process.env;
const { BITFILMSDB = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

const CORS_DATA = {
  credentials: true,
  origin: ['https://diplom.nomoreparties.sbs', 'http://localhost:3001'],
  maxAge: 60,
};

module.exports = {
  PORT,
  NODE_ENV,
  JWT_SECRET,
  BITFILMSDB,
  CORS_DATA,
};
