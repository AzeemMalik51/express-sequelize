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
                len: [2, 20]
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        accessToken: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
                isEmail: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        bussinesName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 20],
            }
        },

        accessTokenCreation: {
            type: DataTypes.DATE,
            allowNull: true
        },
        lastLoginDate: {
            type: DataTypes.DATE
        },
    }, {
        hooks: {
            beforeCreate: (user, options) => {
                return user.password = passwordHash.generate(user.password, config.HASH_OPTIONS);
            },
            beforeUpdate: (user, options) => {
                return user.password = passwordHash.generate(user.password, config.HASH_OPTIONS);
            },
        },
        instanceMethods: {
            validatePassword: function (userPass, password) {
                return passwordHash.verify(userPass, password);
            }
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