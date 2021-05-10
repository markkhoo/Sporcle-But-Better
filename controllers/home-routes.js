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

router.get('/search', async (req, res) => {
    
    // Determines if logged in at time of get
    let checkLogin = false;
    if (req.session.logged_in){
        checkLogin = true;
    };
    
    try {
        const userData = await User.findOne({
            where: {
                username: req.query.username, // <= query here!!!
            },
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
                [{ model: Game }, 'score', 'DESC'],
                [{ model: Game }, 'time', 'ASC'],
            ],
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
        };
        const highscores = [...Object.values(highest)];
        res.render('profile', {
            user: user,
            Games: highscores,
            logged_in: checkLogin
        });
    } catch (err) {
        res.render('nouser', {
            nulluser: req.query.username,
            logged_in: checkLogin
        });
    };
});

// Get Leaderboard
router.get('/leader', async (req, res) => {
    if (req.session.logged_in) {
        res.render('leaderboard', {
            logged_in: true
        });
    } else {
        res.render('leaderboard', {
            logged_in: false
        });
    };
});

module.exports = router;