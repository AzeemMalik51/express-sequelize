"use strict";
var passwordHash = require('password-hash');
var config = require('../config')


module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        hooks: {
            beforeCreate: (user, options) => {
                return user.password = passwordHash.generate(user.password, config.HASH_OPTIONS);
            },
            beforeUpdate: (user, options) => {
                return user.password = passwordHash.generate(user.password, config.HASH_OPTIONS);
            },
        }
    });

    /*
        User.beforeCreate((user, options) => {
            return user.password = passwordHash.generate(password, config.HASH_OPTIONS);
        });*/

    User.sync({
        force: true
    });
    return User;
};