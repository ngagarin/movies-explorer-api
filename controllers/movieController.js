const mongoose = require('mongoose');
const movieModel = require('../models/movieModel');
const { SUCCESSFUL_REQUEST, CREATED } = require('../utils/constants');
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
} = require('../utils/errors/index');

const getMovies = (req, res, next) => {
  movieModel
    .find({})
    .then((movies) => res.status(SUCCESSFUL_REQUEST).json(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  movieModel
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      movieId,
      nameRU,
      nameEN,
    })
    .then((movie) => {
      res.status(CREATED).json(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequestError('Переданы некорректные данные фильма'));
      }
      return next(new InternalServerError('Произошла ошибка на сервере.'));
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  movieModel
    .findById(movieId)
    .orFail(new NotFoundError('Фильм не найден'))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        return Promise.reject(new ForbiddenError('Нельзя удалять чужой фильм'));
      }
      return movieModel
        .findByIdAndRemove(movie);
    })
    .then(() => res.status(SUCCESSFUL_REQUEST).json({ message: 'Фильм удален' }))
    .catch((err) => {
      if (err instanceof NotFoundError || err instanceof ForbiddenError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError('Переданы некорректные данные фильма'));
      }
      return next(new Error('Произошла ошибка на сервере.'));
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
