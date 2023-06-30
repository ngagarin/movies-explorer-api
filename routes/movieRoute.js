const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const movieController = require('../controllers/movieController');
const { URL_PATTERN } = require('../utils/constants');
// const validator = require('../validations/movieValidator'); // почему-то не работает

router.get('/', movieController.getMovies);

// router.post('/', validator.validateCreateMovie, movieController.createMovie);
router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().regex(URL_PATTERN).required(),
    trailerLink: Joi.string().regex(URL_PATTERN).required(),
    thumbnail: Joi.string().regex(URL_PATTERN).required(),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), movieController.createMovie);

// router.delete('/:movieId', validator.validateDeleteMovie, movieController.deleteMovie);
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
}), movieController.deleteMovie);

module.exports = router;
