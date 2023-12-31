const router = require('express').Router();
const { errors } = require('celebrate');
const authRouter = require('./authRoute');
const userRouter = require('./usersRoute');
const movieRouter = require('./movieRoute');
const signoutRouter = require('./signoutRoute');
const { validateToken } = require('../middlewares/auth');
const { clearToken } = require('../middlewares/signout');
const { NotFoundError } = require('../utils/errors/index');
const { URL_NOT_FOUND_MSG } = require('../utils/constants');

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/', authRouter);
router.use(validateToken);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('/signout', clearToken, signoutRouter);
router.use('*', (req, res, next) => next(new NotFoundError(URL_NOT_FOUND_MSG)));

router.use(errors());

module.exports = router;
