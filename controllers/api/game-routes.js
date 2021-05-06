const router = require('express').Router();
const { User, Game, Countries, Continent } = require('../models');
const withAuth = require('../utils/auth');

router.post('/', withAuth, async (req, res) => {
    try {
        const gameData = await Game.create()
    }
})





module.exports = router;