const Category = require('../models/Category');
const User = require('../models/User');
const Product = require('../models/Product');
const sequelize = require('../utils/connection');
require("../models")

const main = async () => {
    try {
        await sequelize.sync({ force: true });
        // funciones de create...
        await User.create({
            firstName: 'manuel',
            lastName: 'canqui',
            email: 'testeo@gmail.com',
            password: 'hola1234',
            phone: '72555789',
        });
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

main();