var async = require("async");
var User = require('../../models/user');
var _ = require('lodash');
module.exports = {

    authorize: function (permissions, collectionName, docId, userField, query) {
        return function (req, res, next) {
            var user = req.user;
            async.parallel([
                    function (callback) {
                        Permission.find({
                            permission: {
                                $in: permissions
                            },
                            "$or": [{
                                "users": user._id
                            }, {
                                "roles": {
                                    $in: user.roles
                                }
                            }, {
                                "groups": {
                                    $in: user.groups
                                }
                            }]
                        }).lean().exec(
                            function (err, docs) {
                                if (!err && docs && docs.length) {
                                    if (query) {
                                        req.user[userField] = user._id;
                                    }
                                    callback(null, true);
                                } else {
                                    callback(null, false);
                                }
                            });
                    },
                    function (callback) {
                        if (collectionName && docId) {
                            var query = {
                                _id: req.params[docId] || req.body[docId]
                            };
                            query[userField] = user._id;
                            var model = require('../../models/' + collectionName);
                            model.findOne(query).lean().exec(function (err, doc) {
                                if (!err && doc) {
                                    callback(null, true);
                                } else {
                                    callback(null, false);
                                }
                            });
                        } else {
                            callback(null, false);
                        }
                    },
                    function (callback) {
                        if (user.admin) {
                            callback(null, true);
                        } else {
                            callback(null, false);
                        }
                        /*Role.findOne({
                            name: "ADMIN",
                            _id: {
                                $in: user.roles
                            }
                        }, function (err, doc) {
                            if (!err && doc) {
                                callback(null, true);
                            } else {
                                callback(null, false);
                            }
                        });*/
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