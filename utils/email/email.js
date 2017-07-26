var email = require("emailjs/email");
var config = require('../../config.js');
var emailServer = config.emailServer;
var fromAddress = 'Scoping_Calculator@proficio.com';
if (config.ENV == 'development') {
    emailServer = config.devEmailServer;
    fromAddress = 'nextqms@gmail.com';
}
var mailServer = email.server.connect(emailServer);
var fs = require("fs");
var _ejs = require("ejs");

// send the message and get a callback with an error or details of the message that was sent
module.exports = {
    sendEmail: function (receiver, purpose, token, password, userName, done) {
        if (config.ENV == 'development') {
            receiver = 'nextqms@gmail.com,vteams.dev@gmail.com';
        }
        if (!receiver) {
            return done({
                message: "email field is emty!"
            });
        }

        var email = {};

        if (config.email.PURPOSE.Invitation === purpose) {
            email.subject = config.email.InvitationSubject;
            email.template = process.cwd() + '/views/inviteEmail.ejs';
            email.baseUrl = config.loginUrl;
            email.logoUrl = config.logoUrl;
            email.password = password;
            email.userName = userName;
        } else if (config.email.PURPOSE.FORGOTPASSWORD === purpose) {
            email.subject = config.email.PURPOSE.FORGOTPASSWORD;
            email.logoUrl = config.logoUrl;
            email.template = process.cwd() + '/views/forgetpassword.ejs';
            email.baseUrl = config.loginUrl + "forgetPassword?" + "token=" + token + "&email=" + receiver;
            email.userName = userName;
        } else if (config.email.PURPOSE.ESTIMATE === purpose) {
            email.subject = 'Proficio-Estimate-' + token.action;
            email.template = process.cwd() + '/views/estimate-approval.ejs';
            email.baseUrl = config.loginUrl;
            email.logoUrl = config.logoUrl;
            email.estimateUrl = config.loginUrl + 'estimates/' + token._id;
            email.userName = token.userName;
            email.estimateNumber = token.estimateNumber;
            email.from = token.from;
            email.action = token.action;
        } else {
            return done({
                message: 'no or invalid purpose '
            });
        }

        fs.readFile(email.template, 'utf8', function (err, file) {
            if (err)
                return done(err);
            else {
                //compile jade template into function
                var compiledTmpl = _ejs.compile(file, {
                    filename: email.template
                });
                var data = {
                    baseurl: email.baseUrl,
                    newPassword: email.newPassword,
                    rootPath: config.baseURL,
                    logoUrl: email.logoUrl,
                    password: email.password,
                    userEmail: receiver,
                    userName: email.userName
                };
                // get html back as a string with the context applied;
                if (email.estimateUrl && email.estimateNumber) {
                    data = email;
                }
                var html = compiledTmpl({
                    data: data
                });
                mailServer.send({

                    from: fromAddress,
                    to: receiver,
                    /*
                                        from: 'no-reply@nextqms.vteamslabs.com',
                                        to: receiver,*/

                    //cc: emailServer.user.toString(),
                    subject: email.subject,
                    attachment: [{
                        data: html,
                        alternative: true
                    }]

                }, done);
            }
        });

    }

};