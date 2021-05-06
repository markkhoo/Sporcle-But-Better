const router = require('express').Router();
const { User, Game, Countries, Continent } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:id', withAuth, (req, res) => {
    try {
        const continentData = await Continent.findOne({
            where: {
               id: req.params.id
            },
            include: [
                {
                    model: Countries
                },
            ],
        });
        const continent = continentData.get({ plain: true });
        res.status(200).json(continent);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('/login');
});

router.get('/signup', (req, res) => {
    res.render('/signup');
});







module.exports = router;