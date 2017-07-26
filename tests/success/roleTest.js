/* global it */
/* global describe */
var root = require('./root');
var request = require('supertest');
var randomString = require('random-string');
var async = require('async');
var casual = require('casual');
var rId;
var random = randomString({
    length: 10,
    letters: true
});

describe('Roles', function () {

    it("Create", function (done) {
        this.timeout(root.t);
        request(root.url)
            .post('roles')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .send({
                name: "OPS",
                description: "",
                permissions: []
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
            .post('roles')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .send({
                name: "SalesPerson",
                description: "",
                permissions: []
            })
            .expect(201)
            .end(function (err, res) {
                rId = res.body._id;
                if (err)
                    console.log(err);
                this.timeout(root.t);
                request(root.url)
                    .put('roles/' + rId)
                    .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
                    .send({
                        name: "SalesPerson",
                        description: "",
                        permissions: []
                    })
                    .expect(200)
                    .end(function (err, res) {
                        if (err)
                            console.log(err);
                        done(err);
                    });
            });
    });

    it("Get", function (done) {
        this.timeout(root.t);
        request(root.url)
            .get('roles/' + rId)
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
            .get('roles')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .expect(200)
            .end(function (err, res) {
                if (err)
                    console.log(err);
                done(err);
            });
    });

});