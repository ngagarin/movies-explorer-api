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
const {
  USER_UNAUTHORIZED_MSG,
  USER_CONFLICT_MSG,
  USER_BAD_REQUEST_MSG,
  INTERNAL_ERROR_MSG,
  USER_NOT_FOUND_MSG,
} = require('../utils/constants');

const login = (req, res, next) => {
  const { email, password } = req.body;

  return userModel
    .findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
        secure: true,
      })
        .send({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
    })
    .catch(next);
};

const signout = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: true,
    secure: true,
  });
  return res.status(SUCCESSFUL_REQUEST).json(USER_UNAUTHORIZED_MSG);
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
        return next(new ConflictError(USER_CONFLICT_MSG));
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError(USER_BAD_REQUEST_MSG));
      }
      return next(new InternalServerError(INTERNAL_ERROR_MSG));
    });
};

const getUser = (req, res, next) => {
  let userId;
  if (req.params.userId) userId = req.params.userId;
  else userId = req.user._id;

  userModel
    .findById(userId)
    .orFail(new NotFoundError(USER_NOT_FOUND_MSG))
    .then((user) => res.status(SUCCESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(USER_BAD_REQUEST_MSG));
      }
      return next(new InternalServerError(INTERNAL_ERROR_MSG));
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  userModel
    .findByIdAndUpdate(
      userId,
      { name, email },
      { new: true, runValidators: true },
    )
    .orFail(new NotFoundError(USER_NOT_FOUND_MSG))
    .then((user) => res.status(SUCCESSFUL_REQUEST).send(user))
    .catch((err) => {
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные пользователя'));
      }
      if (err.code === 11000) {
        return next(new ConflictError(USER_CONFLICT_MSG));
      }
      return next(new InternalServerError(INTERNAL_ERROR_MSG));
    });
};

module.exports = {
  login,
  signout,
  createUser,
  getUser,
  updateUserInfo,
};
