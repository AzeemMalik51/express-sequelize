/* global it */
/* global describe */
var root = require('./root');
var request = require('supertest');
var randomString = require('random-string');
var async = require('async');
var casual = require('casual');

var random = randomString({
    length: 10,
    letters: true
});

describe('User', function () {

    it("Login", function (done) {
        this.timeout(root.t);
        request(root.url)
            .post('account/login')
            .send({
                email: root.adminUser.email,
                password: root.adminUser.password,
            })
            .expect(200)
            .end(function (err, res) {
                if (err)
                    console.log(err);
                done(err);
            });
    });


    it("Get", function(done) {
        this.timeout(root.t);
        request(root.url)
            .get('users/' + root.adminUser._id)
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .expect(200)
            .end(function(err, res) {
                if (err)
                    console.log(err);
                done(err);
            });
    });


    it("Logout", function (done) {

        request(root.url)
            .put('account/logout')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .expect(200)
            .end(function (err, res) {
                if (err)
                    console.log(err);
                done(err);
            });



    });
});