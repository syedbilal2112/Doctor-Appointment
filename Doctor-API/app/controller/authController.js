
const express = require('express');
const constant = require('../../utils/constant');
const isAuthenticate = require('../../app/services/token-service');
const authService = require('../services/authService');

const passport = require('passport');
const jwt = require('jsonwebtoken');

const route = express.Router();
require('../../utils/auth');

route.post('/signup', passport.authenticate('signup', { session: false }), async (req, res, next) => {
    if (req.user.message) {
        res.json({
            message: 'Signup successful'
        })
    } else if(req.user.isExists) {
        res.status(constant.HTML_STATUS_CODE.CREATED).json({message: 'User Already Exists, Otp has been sent to your mail'});
    } else{
        res.status(constant.HTML_STATUS_CODE.INTERNAL_ERROR).json({message: 'Sign up Failed, Email already Exists'});
    }
})

route.post('/signin', authService.authenticated);

route.post('/validateOtp', (req, res) => {
    authService.validateOtp(req).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.post('/generateOpt', (req, res) => {
    authService.generateOpt(req).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.post('/updatePassword',isAuthenticate, (req, res) => {
    authService.updatePassword(req).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.get('/getDoctorProfileStatus',isAuthenticate, (req, res) => {
    authService.getDoctorProfileStatus(req.user).then((result) => {
        res.status(constant.HTML_STATUS_CODE.CREATED).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

module.exports = route;