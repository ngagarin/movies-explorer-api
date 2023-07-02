const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { SUCCESSFUL_REQUEST, CREATED } = require('../utils/constants');
const { NODE_ENV, JWT_SECRET } = require('../utils/config');
const {
  BadRequestError,
  NotFoundError,
  ConflictError,
  InternalServerError,
} = require('../utils/errors/index');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return userModel
    .findUserByCredentials(email, password)
    .then((user) => {
      const { _id, name, email } = user;

      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        secure: true,
      })
        .send({ _id, name, email });
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: true,
    secure: true,
  });
  return res.status(SUCCESSFUL_REQUEST).json({ message: 'Деавторизация прошла успешно.' });
};

const createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => userModel
      .create({
        ...req.body, password: hash,
      }))
    .then(({
      _id,
      name,
      email,
    }) => {
      res.status(CREATED).send(
        {
          data: {
            _id,
            name,
            email,
          },
        },
      );
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с указанным email уже зарегистрирован'));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные пользователя'));
      }
      return next(new InternalServerError('Произошла ошибка на сервере.'));
    });
};

const getUser = (req, res, next) => {
  let userId;
  if (req.params.userId) userId = req.params.userId;
  else userId = req.user._id;

  userModel
    .findById(userId).orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => res.status(SUCCESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Переданы некорректные данные пользователя'));
      }
      return next(new InternalServerError('Произошла ошибка на сервере.'));
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  userModel
    .findByIdAndUpdate(req.user._id, { name, email }, { new: true })
    .orFail(new NotFoundError(`Пользователь с id:${req.user._id} не найден`))
    .then((user) => res.status(SUCCESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные пользователя'));
      }
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь с указанным email уже зарегистрирован'));
      }
      return next(new InternalServerError('Произошла ошибка на сервере.'));
    });
};

module.exports = {
  login,
  signout,
  createUser,
  getUser,
  updateUserInfo,
};
