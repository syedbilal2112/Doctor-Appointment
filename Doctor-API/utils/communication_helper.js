
const constant = require('./../utils/constant');
const utils = require('../utils/utilities');

exports.sendWelcomeMessageEmail = function (toEmail, name, otp) {
    let now = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
    now = new Date(now);

    return {
        from: 'Live Doctor',
        to: toEmail, // list of receivers
        subject: 'Welcome to Live Doctor', // Subject line
        text: 'Hello ' + name + 'Please Verify Your account with the otp Mentione below, it is valid for 5 minutes',
        html: 'Hello ' + name + ',<br/><br/>' +
            'The OTP for Validation is: <b>' + otp + '</b> <br /> <br />' +
            'Your Customer Name is ' + name + '<br>' +
            'Your Password is as you given at the time of registration<br>' +
            'If you have any concerns or queries, we’re happy to help. Please reach out to us at info@liveDoctor.com.</p>' + '<p><b>Regards,</b></p>' + '<p><b>Team Live Doctor</b></p>'// html body
    };
};


exports.sendForgotOTPEmail = function (toEmail, name, otp) {
    return {
        from: 'Live Doctor',
        to: toEmail, // list of receivers
        subject: 'Forgot Password ', // Subject line
        text: 'Hello ' + name + ', Your Password has been changed successfully, Please Log in to your account for further operations.',
        html: 'Hello ' + name + ',<br/><br/>' +
            'The OTP for reset password is: <b>' + otp + '</b> <br /> <br />' +
            'If you have any concerns or queries, we’re happy to help. Please reach out to us at info@liveDoctor.com.</p>' +
            '<p><b>Regards,</b></p>' +
            '<p><b>Team Live Doctor</b></p>'// html body
    };
};