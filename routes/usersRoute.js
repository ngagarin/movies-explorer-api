const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userController = require('../controllers/usersController');
// const validator = require('../validations/userValidator'); // почему-то не работает

router.get('/me', userController.getUser);

// router.patch('/me', validator.validateUserInfo, userController.updateUserInfo);
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
}), userController.updateUserInfo);

module.exports = router;
