const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Countries extends Model {}

Countries.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        capital: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        continent_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'continent',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'countries'
    }
);

module.exports = Countries;