const router = require('express').Router();
const movieController = require('../controllers/movieController');
const validator = require('../validations/movieValidator');

router.get('/', movieController.getMovies);

router.post('/', validator.validateCreateMovie, movieController.createMovie);

router.delete('/:movieId', validator.validateDeleteMovie, movieController.deleteMovie);

module.exports = router;
