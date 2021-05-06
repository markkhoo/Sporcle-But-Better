const router = require('express').Router();
const { User, Game, Countries, Continent } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    res.render('homepage');
})


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

<<<<<<< HEAD
router.get('/newgame/:id', withAuth, async (req, res) => {
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
        const game = gameData.get({ plain: true });
        res.render('/gamepage', {
            game,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
=======
router.get('/newgame/:id', withAuth, (req, res) => {
    res.render('gamepage');
    // try {
    //     const continentData = await Continent.findOne({
    //         where: {
    //            id: req.params.id
    //         },
    //         include: [
    //             {
    //                 model: Countries
    //             },
    //         ],
    //     });
    //     const continent = continentData.get({ plain: true });
    //     res.render('/gamepage', {
    //         continent,
    //         logged_in: req.session.logged_in
    //     });
    //     res.status(200).json(continent);
    // } catch (err) {
    //     console.log(err);
    //     res.status(500).json(err);
    // }
>>>>>>> fbe7cca58e6cad60e3845015867a09e1ee1d219e
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
        });
        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user,
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
        res.render('searchuser', {
            user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;