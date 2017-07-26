var async = require("async");
var Role = require('../../models/role');
var User = require('../../models/user');
var _ = require('lodash');
module.exports = {

    authorize: function (permission, collectionName, docId, userField) {

        return function (req, res, next) {

            var user = req.user._doc;

            async.parallel([
                    function (callback) {
                        Role.findOne(
                            user.role,
                            function (err, doc) {
                                if (!err && doc) {
                                    var permissions = doc.permissions;
                                    if (typeof (permission) == 'object') {
                                        var allow = false;
                                        for (var i = 0; i < permission.length; i++) {
                                            allow = allow || (permissions.findIndex(x => x.associatedPermission == permission[i]) >= 0);
                                        }
                                        if (allow) {
                                            callback(null, true);
                                        } else {
                                            callback(null, false);
                                        }
                                    } else {
                                        if (permissions.findIndex(x => x.associatedPermission == permission) >= 0 || doc.associatedPermission == permission) {
                                            callback(null, true);
                                        } else {
                                            callback(null, false);
                                        }
                                    }
                                } else {
                                    callback(null, 401);
                                }
                            });
                    },
                    function (callback) {
                        var query = {
                            _id: req.params[docId] || req.body[docId]
                        };
                        query[userField] = user._id;
                        var model = require('../../models/' + collectionName);
                        model.findOne(query, function (err, doc) {
                            if (!err && doc) {
                                callback(null, true);
                            } else {
                                callback(null, false);
                            }
                        });
                    }
                ],
                function (err, result) {
                    if (result.indexOf(true) > -1) {
                        return next();
                    } else if (result.indexOf(401) > -1) {
                        return next({
                            status: 401,
                            message: 'Invalid User'
                        });
                    } else {
                        return next({
                            status: 403,
                            message: 'access denied'
                        });
                    }
                });

        };


    }
};