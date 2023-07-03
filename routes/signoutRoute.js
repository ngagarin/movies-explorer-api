const router = require('express').Router();
const userController = require('../controllers/usersController');

router.post('/', userController.signout);

module.exports = router;
