var express = require('express');
var router = express.Router();
var UserController = require('../controllers/userController');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var router = express.Router();
var Acl = require('../utils/access_control/authorize');

/*
passport.use(new BearerStrategy(UserController.findByToken));
var tokenAuth = passport.authenticate('bearer', {
    session: false
});*//*

router.route('/account/login')
    .post(UserController.login);
router.route('/account/forget-password')
    .post(UserController.forgetPassword);

router.route('/account/forget-password/reset')
    .post(UserController.resetForgotPassword);

router.route('/account/logout')
    .put(UserController.logout);

router.route('/account/users/password')
    .put(UserController.changePassword);*/

router.route('/users')
    .get(UserController.getUsers)
    .post(UserController.createUser);
/*
router.route('/users/role/:userId')
    .post(UserController.updateUserRole);

router.route('/users/:userId')
    .get(UserController.getUser)
    .put(UserController.updateUser)
    .delete(UserController.deleteUser);*/

module.exports = router;