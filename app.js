var compression = require('compression');
var express = require('express');
var helmet = require('helmet');
var app = express();
var cookieParser = require('cookie-parser');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var config = require('./config.js');
var constants = require('./constants/constants');
var UserController = require('./controllers/userController');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var fs = require('fs');
var router = express.Router();/*
passport.use(new BearerStrategy(UserController.findByToken));
var tokenAuth = passport.authenticate('bearer', {
    session: false
});*/



var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
var morgan = require('morgan');
var passport = require('passport');
var Sequelize = require("sequelize");

// Routes
var users = require('./routes/userApi');




app.use(helmet());

global.sequelize = new Sequelize('test', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


// enabled CORS for dev only
if (config.ENV === constants.environments.DEVELOPEMENT) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", req.get('Origin'));
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma");
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });
}

//app listen
app.listen(config.PORT || 9000, function () {
    console.log('Proficio running at port :', config.PORT);
});

app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'public')));

app.set('superSecret', config.JWT_SECRET);
app.use(morgan('dev')); // loging api requests
// app.use(morgan(' :method :url :response-time :status ')); // loging api requests
/*app.use(favicon(__dirname + '/public/favicon-icon.ico'));*/

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/public', validateCookieToken, function (req, res, next) {
    var stats;
    try {
        stats = fs.statSync('./' + req.originalUrl);
        next();
    } catch (e) {
        res.redirect('/error');
    }

});

app.use('/public', express.static(path.join(__dirname, 'public')));


// add your route files in this array

app.use('/api/v1/', [users]);
app.get('*', function (req, res, next) {
    res.sendFile(path.join(__dirname, './client', 'index.html'));
});



// error handler
app.use(function (err, req, res, next) {
    /* console.error({
         message: err
     });*/
    if (err.code === 'LIMIT_FILE_SIZE' || err.name === 'ValidationError') {
        return res.status(400).json(err);
    }
    if (err.message === 'Invalid token') {
        return res.status(403).json(err);
    }
    if (err.code === 11000) {
        return res.status(400).json({
            message: "Record already exist!",
            err: err
        });
    }
    if (err.stack && config.ENV === constants.environments.DEVELOPEMENT) {
        console.error(err, err.stack);

    }
    if (err.name === "CastError") {
        return res.status(400).json(Error.notFound);
    }
    return res.status(err.status || 500).send({
        message: err.message || err.name || err
    });

});

module.exports = app;

function validateCookieToken(req, res, next) {

    if (req.user || (req.cookies && req.cookies.accessToken)) {

        UserController.findByToken(req.cookies.accessToken, function (err) {
            if (err) next(403);
            else {
                next();
            }
        });
    } else {
        next(401);
    }

}