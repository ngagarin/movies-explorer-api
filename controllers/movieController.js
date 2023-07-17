const mongoose = require('mongoose');
const movieModel = require('../models/movieModel');
const { SUCCESSFUL_REQUEST, CREATED } = require('../utils/constants');
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
} = require('../utils/errors/index');
const {
  MOVIE_BAD_REQUEST_MSG,
  MOVIE_NOT_FOUND_MSG,
  MOVIE_FORBIDEN_MSG,
  INTERNAL_ERROR_MSG,
  MOVIE_DELETED_MSG,
} = require('../utils/constants');

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
        return next(new BadRequestError(MOVIE_BAD_REQUEST_MSG));
      }
      return next(new InternalServerError(INTERNAL_ERROR_MSG));
    });
};

const deleteMovie = (req, res, next) => {
  const userId = req.user._id;
  const { movieId } = req.params;

  movieModel
    .findById(movieId)
    .orFail(new NotFoundError(MOVIE_NOT_FOUND_MSG))
    .then((movie) => {
      if (userId !== movie.owner.toString()) {
        return Promise.reject(new ForbiddenError(MOVIE_FORBIDEN_MSG));
      }
      return movieModel
        .findByIdAndRemove(movie);
    })
    .then(() => res.status(SUCCESSFUL_REQUEST).json(MOVIE_DELETED_MSG))
    .catch((err) => {
      if (err instanceof NotFoundError || err instanceof ForbiddenError) {
        return next(err);
      }
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(MOVIE_BAD_REQUEST_MSG));
      }
      return next(new Error(INTERNAL_ERROR_MSG));
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
