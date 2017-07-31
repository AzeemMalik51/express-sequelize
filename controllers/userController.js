var models = require('../models');
var config = require('../config')
var passwordHash = require('password-hash');
var utilErrors = require("../utils/error.messages");
var jwt = require('jwt-simple');


module.exports = {

    createUser: function (req, res, next) {
        var userName = req.body.username; //bodyParser does the magic
        var password = req.body.password;
        var body = req.body;
        //  body.password = passwordHash.generate(password, config.HASH_OPTIONS);
        models.User.create(body).then(function (success) {
            return res.json({
                message: 'User created!'
            });
        }).catch(function (error) {
            return next(error)
        });
    },
    signUp: function (req, res, next) {
        var userName = req.body.username; //bodyParser does the magic
        var password = req.body.password;
        var body = req.body;
        if (body.password != body.confirmPassword) {
            return res.status(400).json({
                message: "Password and confirm password not matching!"
            });
        }

        models.User.create(body).then(function (success) {
            return res.json({
                message: 'User created!'
            });
        }).catch(function (error) {
            return next(error)
        });

    },
    login: function (req, res, next) {
        if (req.body.email || req.body.userName)
            return loginUtil(req.body, function (err, user) {
                if (err) {
                    return next(err);
                } else if (user) {
                    return res.json(user);
                }
            });
        else {
            return next(utilErrors.missingRequiredQueryParameter);
        }
    },

    getUsers: function (req, res, next) {

    },

    getUser: function (req, res, next) {

    },

    updateUser: function (req, res, next) {


    },

    deleteUser: function (req, res, next) {

    }
}

function loginUtil(userBody, done) {

    if (userBody && userBody.email) {

        models.User.findOne({
            where: {
                $or: [{
                    email: userBody.email
                }, {
                    userName: userBody.email
                }]
            }
        }).then(user => {

            if (!user)
                return done(utilErrors.authenticationFail);
            else if (user && passwordHash.verify(userBody.password, user.password)) { // password matches
                var updateQuery = {}
                if (!user.accessToken) { // if user has no token
                    var accessTokenCreation = new Date();
                    var accessToken = jwt.encode({
                        id: user.id,
                        role: user.role,
                        created_on: accessTokenCreation
                    }, config.JWT_SECRET);
                    updateQuery = {
                        accessToken: accessToken,
                        accessTokenCreation: accessTokenCreation,
                        lastLoginDate: new Date()
                    }

                } else { // if user has a token already 
                    updateQuery = {
                        lastLoginDate: new Date()
                    }
                }

                models.User.update(updateQuery, {
                        where: {
                            id: user.dataValues.id
                        }
                    })
                    .then(suc => {
                        return findUser(user.id, done);
                    }).catch(err => {
                        return done(err);
                    });
            } else {
                done(utilErrors.authenticationFail);
            }
        }).catch(err => {
            return done(err);
        });
    } else {
        done(utilErrors.authenticationFail);
    }
}

function findUser(userId, done) {
    return models.User.findOne({
        where: {
            id: userId
        },
        attributes: ['name', 'userName', 'email', 'accessToken', 'bussinesName']
    }).then(user => {
        return done(null, user);

    }).catch(err => {
        return done(err);
    });

}

function findByToken(token, done) {

    var payload = null;
    try {
        payload = jwt.decode(token, config.JWT_SECRET);

    } catch (e) {
        return done({
            message: 'Invalid token'
        });
    }
    if (payload) {
        // check the token expiration
        if ((new Date().getTime() - new Date(payload.created_on).getTime()) >= config.TOKEN_EXPIRIES.ACCESS_TOKEN_EXPIRY) {

            models.User.update({
                    accessToken: null,
                    accessTokenCreation: null
                }, {
                    id: payload.id
                })
                .then(suc => {
                    return done({
                        message: 'Invalid token'
                    });
                }).catch(err => {
                    return done(err);
                });
        } else {

            models.User.findOne({
                where: {
                    id: userId
                },
                include: ['name', 'userName', 'email', 'accessToken', 'bussinesName']
            }).then(user => {
                return done(null, user);

            }).catch(err => {
                return done(err);
            });
        }

    } else {
        return done(null, {
            message: 'Invalid token'
        });
    }

}