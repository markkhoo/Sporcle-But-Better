const router = require('express').Router();

const userRoutes = require('./user-routes');
const gameRoutes = require('./game-routes');
const leadRoutes = require('./leader-routes');

router.use('/user', userRoutes);
router.use('/game', gameRoutes);
router.use('/leader', leadRoutes);

module.exports = router;