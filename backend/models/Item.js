const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Category = require('./Category'); 

const Item = sequelize.define('Item', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  imageUrl: {  
    type: DataTypes.STRING,
    allowNull: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: Category, 
      key: 'id',
    },
  },
});

Item.belongsTo(Category, { foreignKey: 'categoryId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Category.hasMany(Item, { foreignKey: 'categoryId' });

module.exports = Item;
