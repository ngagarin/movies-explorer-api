const { celebrate, Joi } = require('celebrate');
const { dataValidate } = require('../middlewares/dataValidate');

const validateCreateMovieSchema = Joi.object({
  country: Joi.string().required().messages({
    'string.base': 'Поле country должно быть строкой',
    'string.empty': 'Поле country не может быть пустым',
    'any.required': 'Поле country обязательно для заполнения',
  }),
  director: Joi.string().required().messages({
    'string.base': 'Поле director должно быть строкой',
    'string.empty': 'Поле director не может быть пустым',
    'any.required': 'Поле director обязательно для заполнения',
  }),
  duration: Joi.number().integer().required().messages({
    'number.base': 'Поле duration должно состоять из цифр',
    'number.empty': 'Поле duration не может быть пустым',
    'any.required': 'Поле duration обязательно для заполнения',
  }),
  year: Joi.string().required().messages({
    'string.base': 'Поле year должно быть строкой',
    'string.empty': 'Поле year не может быть пустым',
    'any.required': 'Поле year обязательно для заполнения',
  }),
  description: Joi.string().required().messages({
    'string.base': 'Поле description должно быть строкой',
    'string.empty': 'Поле description не может быть пустым',
    'any.required': 'Поле description обязательно для заполнения',
  }),
  image: Joi.string().uri().required().messages({
    'string.uri': 'Неверный формат url в поле image',
    'string.base': 'Поле image должно быть ссылкой',
    'string.empty': 'Поле image не может быть пустым',
    'any.required': 'Поле image обязательно для заполнения',
  }),
  trailerLink: Joi.string().uri().required().messages({
    'string.uri': 'Неверный формат url в поле trailerLink',
    'string.base': 'Поле trailerLink должно быть ссылкой',
    'string.empty': 'Поле trailerLink не может быть пустым',
    'any.required': 'Поле trailerLink обязательно для заполнения',
  }),
  thumbnail: Joi.string().uri().required().messages({
    'string.uri': 'Неверный формат url в поле thumbnail',
    'string.base': 'Поле thumbnail должно быть ссылкой',
    'string.empty': 'Поле thumbnail не может быть пустым',
    'any.required': 'Поле thumbnail обязательно для заполнения',
  }),
  movieId: Joi.number().integer().required().messages({
    'number.base': 'Поле movieId должно состоять из цифр',
    'number.empty': 'Поле movieId не может быть пустым',
    'any.required': 'Поле movieId обязательно для заполнения',
  }),
  nameRU: Joi.string().required().messages({
    'string.base': 'Поле nameRU должно быть строкой',
    'string.empty': 'Поле nameRU не может быть пустым',
    'any.required': 'Поле nameRU обязательно для заполнения',
  }),
  nameEN: Joi.string().required().messages({
    'string.base': 'Поле nameEN должно быть строкой',
    'string.empty': 'Поле nameEN не может быть пустым',
    'any.required': 'Поле name nameEN для заполнения',
  }),
});

const validateCreateMovie = dataValidate(validateCreateMovieSchema);

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  validateCreateMovie,
  validateDeleteMovie,
};
