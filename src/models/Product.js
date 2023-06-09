const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Product = sequelize.define('product', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    // categoryId
    price: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    { timestamps: false }
);

module.exports = Product;