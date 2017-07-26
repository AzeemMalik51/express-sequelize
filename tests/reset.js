var request = require('supertest');
var config = require('../config');
var User = require('../models/user');
var Role = require('../models/role');

var mongoose = require('mongoose');
var constants = require('../constants/constants');

exports.url = config.baseURL + "/api/v1/";
exports.t = 3000;

var adminUser = {
    userName: 'proficio',
    firstName: 'Proficio',
    lastName: 'User',
    email: 'demo@example.com',
    password: 'Abcd1234',
    active: true,
    admin: true,
    primaryContact: '032231',
    skype: 'TonnySmith.ts',
    role: []
};

if (process.env.ENV === 'development') {
    console.log('dev');
    mongoose.connect(config.CONNECTION);
} else {
    console.log('local');
    mongoose.connect('mongodb://localhost/' + config.DB_NAME);
}

var db = mongoose.connection;

//open mongoose connection and reset user collection 



if (config.ENV == 'development') {
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function (err) {
        if (err) throw err;
        else {
            mongoose.connection.db.dropDatabase(function (err) {

                if (err) throw err;
                else {
                    console.log('gone');

                }
            });

        }
    });


    describe('Reset', function () {


        it('Create SuperAdmin', function (done) {
            this.timeout(exports.t);
            return Role.create({
                name: 'ADMIN',
                description: ""
            }, function (err, rol) {
                console.log(rol);
                adminUser.roles = [rol._id];
                var user = new User(adminUser);
                return user.save(user, function (err, res) {
                    if (err) console.error(err);
                    done(err);
                });
            });

        });

    });
}