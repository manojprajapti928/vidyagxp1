const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('login', 'root', 'Manoj@123', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
