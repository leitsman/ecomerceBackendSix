const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../utils/connection');

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
},
    { timestamps: false } //disabled createAt/updateAt
);

User.beforeCreate(async (req) => {
    const passwordHash = await bcrypt.hash(req.password, 10)
    req.password = passwordHash
});

User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

module.exports = User;