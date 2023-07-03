const Joi = require('joi');
const { dataValidate } = require('../middlewares/dataValidate');

const validateUserInfoSchema = Joi.object({
  name: Joi.string().min(2).max(30).required()
    .messages({
      'string.base': 'Поле name должно быть строкой',
      'string.empty': 'Поле name не может быть пустым',
      'string.min': 'Поле name должно содержать минимум {#limit} символов',
      'string.max': 'Поле name должно содержать максимум {#limit} символов',
      'any.required': 'Поле name обязательно для заполнения',
    }),
  email: Joi.string().email().required().messages({
    'string.email': 'Неверный формат email',
    'string.base': 'Поле email должно быть строкой',
    'string.empty': 'Поле email не может быть пустым',
    'any.required': 'Поле email обязательно для заполнения',
  }),
});

const validateUserInfo = dataValidate(validateUserInfoSchema);

module.exports = {
  validateUserInfo,
};
