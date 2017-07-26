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

describe('Customer', function () {

    it("Create", function (done) {
        this.timeout(root.t);
        request(root.url)
            .post('customers')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .send({
                name: "Tonny Smith",
                companyName: "Test Intl",
                designation: "Some Text here",
                address: "Lahore",
                phone: "0900 78601",
                email: "test@test.com",
                additionalInfo: "Some Text here",
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
            .put('customers/584aa5a8ccfeadba35be3dac')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .send({
                name: "Tonny Smith",
                companyName: "Test Intl",
                designation: "Some Text here",
                address: "Lahore",
                phone: "0900 78601",
                email: "test@test.com",
                additionalInfo: "Some Text here",
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
            .get('customers/584aa5a8ccfeadba35be3dac')
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
            .get('customers')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .expect(200)
            .end(function (err, res) {
                if (err)
                    console.log(err);
                done(err);
            });
    });

});