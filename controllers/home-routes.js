const router = require('express').Router();
const { User, Game, Countries, Continent } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    if (req.session.logged_in) {
        res.render('homepage', {
            logged_in: true
        });
    } else {
        res.render('homepage', {
            logged_in: false
        });
    };
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/newgame', withAuth, (req, res) => {
    res.render('game', {
        logged_in: true
    });
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: 'password' },
            include: [
                {
                    model: Game,
                    include: {
                        model: Continent,
                    },
                },
            ],
            order: [
                [{model: Game}, 'score', 'DESC'],
                [{model: Game}, 'time', 'ASC'],
            ]
        });
        const user = userData.get({ plain: true });
        const highest = {}
        for(let i = 0; i < user.Games.length; i++) {
            let game = user.Games[i];
            if(!highest[game.Continent.name]) {
                highest[game.Continent.name] = game;
            } else {
                if (highest[game.Continent.name].score < game.score) {
                    highest[game.Continent.name] = game;
                };
            }
        }
        const highscores = [...Object.values(highest)];
        console.log(highscores);
        res.render('profile', {
            user: user,
            Games: highscores,
            logged_in: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/profile/:username', withAuth, async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.params.username,
            },
            include: [
                {
                    model: Game,
                    include: {
                        model: Continent,
                    },
                },
            ],
        });
        if (!userData) {
            alert('User not found!');
        }
        const user = userData.get({ plain: true });
        const highest = {}
        for(let i = 0; i < user.Games.length; i++) {
            let game = user.Games[i];
            if(!highest[game.Continent.name]) {
                highest[game.Continent.name] = game;
            } else {
                if (highest[game.Continent.name].score < game.score) {
                    highest[game.Continent.name] = game;
                };
            }
        }
        const highscores = [...Object.values(highest)];
        console.log(highscores);
        res.render('searchuser', {
            user,
            Games: highscores,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;