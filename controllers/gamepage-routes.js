const router = require('express').Router();
const { User, Game, Countries, Continent } = require('../models');
const withAuth = require('../utils/auth');

// Find a Continent (Game Category) by it's ID
router.get('/:id', withAuth, async (req, res) => {
    try {
        const continentData = await Continent.findOne({
            where: {
               id: req.params.id
            },
            include: [
                {
                    model: Countries // Include the countries model on the Continent
                },
            ],
        });
        const continent = continentData.get({ plain: true });
        res.status(200).json(continent); // Send the data back in JSON format
    } catch (err) {
        console.log(err);
        res.status(500).json(err); // Server side error
    }
});

// router.get('/login', (req, res) => {
//     if (req.session.logged_in) {
//         res.redirect('/profile');
//         return;
//     }
//     res.render('login');
// });

// router.get('/profile', withAuth, async (req, res) => {
//     try {
//         const userData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: 'password' },
//             include: [
//                 {
//                     model: Game,
//                     include: {
//                         model: Continent,
//                     },
//                 },
//             ],
//         });
//         const user = userData.get({ plain: true });

//         res.render('/profile', {
//             ...user,
//             logged_in: true
//         });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// });







module.exports = router;