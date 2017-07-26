/* global beforeEach */

var request = require('supertest');
var config = require('../../config');
var _ = require('lodash');
var randomString = require('random-string');
var casual = require('casual');
var random = casual.integer(4, 100000000);
var constants = require('../../constants/constants');

var randomSopTitle = casual.title;
var randomStepTitle = casual.sentence;
var randomDescription = casual.text;
var randomNote = casual.description;

exports.url = config.baseURL + "api/v1/";
exports.t = 30000;

exports.adminUser = {
    userName: 'proficio',
    firstName: 'Proficio',
    LastName: 'User',
    email: 'demo@proficio.com',
    password: 'Abcd1234',
};


beforeEach(function (done) { //signin

    this.timeout(exports.t);

    if (exports.adminUser.accessToken) {
        return done();
    }

     request(exports.url)

    .post('account/login')
        .send({
            email: exports.adminUser.userName,
            password: exports.adminUser.password,
        })
        .expect(200)
        .end(function (err, res) {
            if (err)  done(err);
            else {
                exports.adminUser = _.extend(exports.adminUser, res.body);
                exports.adminUser = _.extend(exports.adminUser, res.body);

                 done();

            }
        });

});

