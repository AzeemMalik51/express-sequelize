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

describe('Device Types', function () {

    it("Create", function (done) {
        this.timeout(root.t);
        request(root.url)
            .post('deviceTypes')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .send({
                name: "DHCP",
                price: 20
            })
            .expect(201)
            .end(function (err, res) {
                if (err)
                    console.log(err);
                done(err);
            });
    });

    it("Update", function (done) {
        this.timeout(root.t);
        request(root.url)
            .put('deviceTypes/584fcd930fd5ab3d4f41e73f')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .send({
                name: "DHCP",
                price: 20
            })
            .expect(200)
            .end(function (err, res) {
                if (err)
                    console.log(err);
                done(err);
            });
    });

    it("Get", function (done) {
        this.timeout(root.t);
        request(root.url)
            .get('deviceTypes/584fcd930fd5ab3d4f41e73f')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .expect(200)
            .end(function (err, res) {
                if (err)
                    console.log(err);
                done(err);
            });
    });

    it("Get List", function (done) {
        this.timeout(root.t);
        request(root.url)
            .get('deviceTypes')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .expect(200)
            .end(function (err, res) {
                if (err)
                    console.log(err);
                done(err);
            });
    });

});