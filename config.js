var moment = require('moment');
var date = moment();
var dir = date.year() + "/" + date.format('MM');
var path = 'private/attachments/';
var destination = './public/attachments/';
module.exports = {

    CONNECTION: 'mongodb://user:pass@ds011308.mongolab.com:11308/Proficio',
    MAX_UPLOAD_PROFILE_SIZE: 2 * 1024 * 1024,
    MAX_UPLOAD_FILE_SIZE: 5 * 1024 * 1024,
    JWT_SECRET: process.env.JWT_SECRET || "#mysql#",
    API_VERSION: "1.0.0",
    ENV: process.env.ENV || 'development',
    DB_NAME: process.env.DB_NAME || 'test',
    dbConfig: {
        "username": "root",
        "password": null,
        "database": "test",
        "host": "127.0.0.1",
        "dialect": "mysql"
    },
    PORT: process.env.PORT || 9001,
    baseURL: process.env.BASE_URL || "http://localhost:9001/",
    loginUrl: process.env.LOGIN_URL || "http://localhost:4200/",
    ATTACHMENT: {
        PATH_USER_IMAGES: path + dir + '/userImages/'
    },

    emailServer: {
        host: "smtp-host",
        port: 25
    },
    devEmailServer: {
        user: "nextqms@gmail.com",
        password: "nextbridge",
        host: "smtp.gmail.com",
        ssl: true
    },
    email: {
        PURPOSE: {
            Invitation: 'Invitation',
            FORGOTPASSWORD: 'Password Reset',
            ESTIMATE: 'estimate'
        },
        InvitationSubject: 'Proficio - Login - Invitation '
    },
    HASH_OPTIONS: {
        algorithm: 'RSA-SHA512'
    },

    TOKEN_EXPIRIES: {
        FORGET_PASSWORD_TOKEN_EXPIRY: 1800, // 30 mins
        INVITATION_TOKEN_EXPIRY: 172800, // 48 hours
        ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || 8640000000 // 100 days
    },
    defaultPassword: 'Word2pass',
    PASSWORD_REGEX: '(?=.*?[^a-zA-Z])(?=.*[A-Z]).{8,}',
    EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
};