const sequelize = require('../config/connection');
const { Continent, Countries, User } = require('../models');

const continentData = require('./continent.json');
const countriesData = require('./country-capitals.json');
const user = require('./user.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Continent.bulkCreate(continentData);
    await Countries.bulkCreate(countriesData);
    await User.bulkCreate(user, {
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
};

seedDatabase();