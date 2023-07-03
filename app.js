const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes/indexRoute');
const { limiter } = require('./utils/rateLimiter');
const {
  PORT,
  BITFILMSDB,
  CORS_DATA,
} = require('./utils/config');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect(BITFILMSDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(cors(CORS_DATA));
app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);
app.use('/api', router);
app.use(errorHandler);
app.use(errorLogger);

app.listen(PORT, () => {
});
