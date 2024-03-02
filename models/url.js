const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const Url = sequelize.define('Url', {
    originalUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shortUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
});

module.exports = { sequelize, Url };
