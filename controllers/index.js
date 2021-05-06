const router = require('express').Router();

const homeRoutes = require('./home-routes');
const apiRoutes = require('./api');
const gameRoutes = require('./gamepage-routes')

router.use('/gamepage', gameRoutes);
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;