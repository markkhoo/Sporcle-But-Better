const router = require('express').Router();
const { User, Game, Countries, Continent } = require('../../models');

// Get Leaderboard
router.get('/', async (req, res) => {
    try {
        const leaderData = await Continent.findAll({
            include: [
                {
                    model: Game,
                    include: {
                        model: User,
                        attributes: { exclude: 'password' },
                    },
                }
            ],
            order: [
                ['id','ASC'],
                [{model: Game}, 'score', 'DESC'],
                [{model: Game}, 'time', 'ASC'],
            ]
        });
        const leader = leaderData.map((e) => e.get({ plain: true }));

        // Truncate Data to only show single user per category
        let data = [];
        for(let i = 0; i < leader.length; i++) {
            data.push({
                id: leader[i].id,
                continent: leader[i].name,
                games: []
            });
            let names = [];
            for(let j = 0; j < leader[i].Games.length; j++) {
                if(!names.includes(leader[i].Games[j].user_id)){
                    names.push(leader[i].Games[j].user_id);
                    data[i].games.push(leader[i].Games[j]);
                };
            };
        };

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;