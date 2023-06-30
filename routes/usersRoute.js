const router = require('express').Router();
const userController = require('../controllers/usersController');
const validator = require('../validations/userValidator');

router.get('/me', userController.getUser);

router.patch('/me', validator.validateUserInfo, userController.updateUserInfo);

module.exports = router;
