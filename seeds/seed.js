const sequelize = require('../config/connection');
const { Continent, Countries } = require('../models');

const continentData = require('./continent.json');
const countriesData = require('./country-capitals.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Continent.bulkCreate(continentData);

    await Countries.bulkCreate(countriesData);

    process.exit(0);
};

seedDatabase();