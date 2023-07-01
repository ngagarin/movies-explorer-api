const router = require('express').Router();
const validator = require('../validations/userValidator');
const userController = require('../controllers/usersController');

router.get('/me', userController.getUser);

router.patch('/me', validator.validateUserInfo, userController.updateUserInfo);

module.exports = router;
