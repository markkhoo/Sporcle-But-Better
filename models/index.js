const User = require('./User');
const Continent = require('./Continent');
const Countries = require('./Countries');
const Game = require('./Game');

User.hasMany(Game, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Continent.hasMany(Countries,{
    foreignKey: 'continent_id',
});

Countries.belongsTo(Continent,{
    foreignKey: 'continent_id',
});

Game.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Game.hasMany(Continent, {
    foreignKey: 'continent_id'
});

Continent.belongsTo(Game, {
    foreignKey: 'continent_id'
});

module.exports = { User, Countries, Continent, Game };
