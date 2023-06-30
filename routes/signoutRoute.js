const router = require('express').Router();
const userController = require('../controllers/usersController');

router.post('/signout', userController.signout);

module.exports = router;
