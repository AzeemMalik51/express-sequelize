var models = require('../models');
var config = require('../config')
var passwordHash = require('password-hash');



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

    getUsers: function (req, res, next) {
        var user = User.build();

        user.retrieveAll(function (users) {
            if (users) {
                res.json(users);
            } else {
                res.send(401, "User not found");
            }
        }, function (error) {
            res.send("User not found");
        });
    },

    getUser: function (req, res, next) {
        var user = User.build();

        user.retrieveById(req.params.user_id, function (users) {
            if (users) {
                res.json(users);
            } else {
                res.send(401, "User not found");
            }
        }, function (error) {
            res.send("User not found");
        });
    },

    updateUser: function (req, res, next) {

        var user = User.build();

        user.username = req.body.username;
        user.password = req.body.password;

        user.updateById(req.params.userId, function (success) {
            console.log(success);
            if (success) {
                res.json({
                    message: 'User updated!'
                });
            } else {
                res.send(401, "User not found");
            }
        }, function (error) {
            res.send("User not found");
        });
    },

    deleteUser: function (req, res, next) {
        var user = User.build();

        user.removeById(req.params.user_id, function (users) {
            if (users) {
                res.json({
                    message: 'User removed!'
                });
            } else {
                res.send(401, "User not found");
            }
        }, function (error) {
            res.send("User not found");
        });
    }
}