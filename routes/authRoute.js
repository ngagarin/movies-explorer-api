const router = require('express').Router();
const userController = require('../controllers/usersController');
const validator = require('../validations/authValidator');

router.post('/signup', validator.validateSignUp, userController.createUser);

router.post('/signin', validator.validateSignIn, userController.login);

module.exports = router;
