
const constant = require('../../utils/constant');
const jwt = require('jsonwebtoken');
const userDAO = require('../models/dao/userDao');

const customResponse = {
    status: 0,
    message: '',
    stack: '',
    error: function (status, message, stack) {
        this.status = status;
        this.message = message;
        this.stack = stack;
        return this;
    }
}

async function isAuthenticate(req, res, next) {
    try {
        // console.log("req.headers.authorization",req.headers)
        let token = req.headers.authorization;
        if (token == null) {
            throw customResponse.error(401, 'Token not found in request');
        }
        // Verify token with APP_SECRET

        token = token.replace(/^Bearer\s/, '');
        const userDetail = jwt.verify(token, constant.APP_SECRETE);
        if (userDetail == null) {
            throw customResponse.error(401, 'Invalid Token');
        }
        // check user data with database if user is valid or not...
        // We can use redis db to check the user data...
        // console.log(userDetail.email)
        let user;
        user = await userDAO.getOne({ email: userDetail.email });
        // Add userDetail in req.user so that we can use user detail in future
        // console.log("user",user);
        req.user = user[0];
        next();
    } catch (error) {
        console.log(error)
        if (error.name && error.name.indexOf('TokenExpiredError') > -1) {
            res.status(401).json(error);
        } else {
            res.status(error.status || 500).json(error);
        }
    }
}


module.exports = isAuthenticate;