const router = require('express').Router();

const userRoutes = require('./user-routes');
const gameRoutes = require('./game-routes');

router.use('/user', userRoutes);
router.use('/game', gameRoutes);

module.exports = router;