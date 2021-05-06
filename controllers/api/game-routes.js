const router = require('express').Router();
const { User, Game, Countries, Continent } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const gameData = await Game.create({
            score: req.body.score,
            time: req.body.time,
            continent_id: req.body.continent_id,
            user_id: req.session.user_id
        });
        res.status(200).json(gameData);
    } catch (err) {
        res.status(500).json(err);
    }
});





module.exports = router;