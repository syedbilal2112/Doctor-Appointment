
var nodemailer = require('nodemailer');
var _ = require('lodash');

var smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'syedbilalhussain.sbh12@gmail.com',
        pass: 'oiucoyxtixqlxolo'
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});

exports.sendSMS = function (mobileNumber, messageString) {

};


exports.sendMail = function (mailOptions) {
    smtpTransport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Mail sent: ', info);
        }
    });
};