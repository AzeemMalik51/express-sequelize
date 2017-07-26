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

describe('Estimate', function () {

    it("Create", function (done) {
        this.timeout(root.t);
        request(root.url)
            .post('estimates')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .send({
                date: new Date(),
                number: 1122,
                termLength: '2 years',
                salesPerson: "John Doe",
                serivceTerms: "Terms here",
                customer: "5849882f3331b35172ba8239",
                reseller: {
                    name: "Tonny Smith",
                    pointOfContact: "Some Text here",
                    address: "Lahore",
                    phone: "0900 78601",
                    email: "test@test.com",
                    additionalInfo: "Some Text here",
                },
                items: [{
                    deviceType: "device Type",
                    vendor: "name here",
                    model: "model here",
                    quantity: "2",
                    compliance: "compliance",
                    amount: 25,
                    discount: 12,
                    deviceAttributes: {
                        hapair: true,
                        managed: false,
                        activedefence: false
                    }
                }],
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
            .put('estimates/584ac7321e78d4495d9b29ef')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .send({
                date: new Date(),
                number: 1122,
                termLength: "3 years",
                salesPerson: "John Doe",
                serivceTerms: "Terms here",
                reseller: {
                    name: "Tonny Smith",
                    pointOfContact: "Some Text here",
                    address: "Lahore",
                    phone: "0900 78601",
                    email: "test@test.com",
                    additionalInfo: "Some Text here",

                },
                items: [{
                    deviceType: "device Type",
                    vendor: "name here",
                    model: "model here",
                    quantity: "2",
                    compliance: "compliance",
                    amount: 25,
                    discount: 12,
                    deviceAttributes: {
                        hapair: true,
                        managed: false,
                        activedefence: false
                    }
                }],
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
            .get('estimates/584ac7321e78d4495d9b29ef')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .expect(200)
            .end(function (err, res) {
                if (err)
                    console.log(err);
                done(err);
            });
    });

    it("Get with version", function (done) {
        this.timeout(root.t);
        request(root.url)
            .get('estimates/584ac7321e78d4495d9b29ef/1')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .expect(200)
            .end(function (err, res) {
                if (err)
                    console.log(err);
                done(err);
            });
    });

    it("Get Estimate No", function (done) {
        this.timeout(root.t);
        request(root.url)
            .get('estimate-no')
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
            .get('estimates')
            .set('Authorization', 'Bearer ' + root.adminUser.accessToken)
            .expect(200)
            .end(function (err, res) {
                if (err)
                    console.log(err);
                done(err);
            });
    });

});