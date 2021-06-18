
const _ = require('lodash');
const jwt = require('jsonwebtoken');

const moment = require('moment');
const utilities = require('../../utils/utilities');
const constant = require('../../utils/constant');
const communication = require('../../utils/communication');
const communication_helper = require('../../utils/communication_helper');
const res = require('../../utils/custom-response');
const userDAO = require('../models/dao/userDao');
const passport = require('passport');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const commonDao = require('../models/dao/commonDao');
/**
 * input validate function
 */
const AuthService = {
    /**
     * Sign in function...
     * params request body with JSON data (username and password)
     * return token if user's credential is valid other wise false
     */
    async authenticated(req, res, next) {
        passport.authenticate('login', async (err, user, info) => {
            try {
                // user = user ? user : req.body;
                if (!user) {
                    const error = new Error('An Error occurred');
                    res.status(400);
                    res.send({
                        code: 400, "message": "Username or Password incorrect"
                    });
                    return res.end();
                }
                const validationError = validationResult(req);

                if (!validationError.isEmpty()) {
                    res.status(402);
                    res.send({
                        code: 402, "message": "Username or Password incorrect"
                    });
                    return res.end();
                }
                req.login(user, { session: false }, async (error) => {
                    if (error) {
                        res.status(400);
                        res.send({
                            code: 400, "message": "Username or Password incorrect"
                        });
                        return res.end();
                    }

                    let userDetails = await userDAO.getOne({ email: user.email });

                    let token;
                    token = jwt.sign(_.pick(userDetails[0], ['_id', 'role', 'name', 'email']), constant.APP_SECRETE, {
                        expiresIn: 60 * 60
                    });
                    if (userDetails[0] && !userDetails[0].isValidated) {
                        res.status(401);
                        res.send({
                            code: 401, "message": "User not Validated"
                        });
                        res.end();
                    } else if (!userDetails[0]) {
                        res.status(401);
                        res.send({
                            code: 401, "message": "Username or Password incorrect"
                        });
                        res.end();
                    }
                    else
                        return res.json({ "result": "success", token, user: _.pick(userDetails[0], ['_id', 'role', 'name', 'email']) });
                });
            } catch (error) {
                console.log("error", error);
            }
        })(req, res, next)
    },

    async isValidPassword(password, userPassword) {
        const compare = await bcrypt.compare(password, userPassword);
        return compare
    },

    async validateOtp(req) {
        try {
            let userDetails = await userDAO.getOne({ email: req.body.email });
            if (userDetails[0] && userDetails[0].otp == req.body.otp) {
                token = jwt.sign(_.pick(userDetails[0], ['_id', 'role', 'name', 'email']), constant.APP_SECRETE, {
                    expiresIn: 60 * 5
                });
                await userDAO.update({ email: userDetails[0].email }, { otp: '', isValidated: true });
                return Promise.resolve({ "result": "success", token, user: _.pick(userDetails[0], ['_id', 'role', 'name', 'email']) });
            } else {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Otp Not Valid', {}));
            }
        } catch (err) {
            console.log(err)
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async generateOpt(req) {
        try {
            let userDetails = await userDAO.getOne({ email: req.body.email });
            if (userDetails[0]) {
                let otp = utilities.getRandomNumber(5);
                let result = await userDAO.update({ email: userDetails[0].email }, { otp });
                const mailOptions = await communication_helper.sendForgotOTPEmail(userDetails[0].email, userDetails[0].name, otp);
                await communication.sendMail(mailOptions);
                return Promise.resolve(result);
            } else {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Email Id Valid', {}));
            }
        } catch (err) {
            console.log(err)
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },
    async updatePassword(req) {
        try {
            let userDetails = await userDAO.getOne({ email: req.body.email });
            if (userDetails[0]) {
                const hash = await bcrypt.hash(req.body.password, 10)
                password = hash;
                let result = await userDAO.update({ email: userDetails[0].email }, { password: password });
                return Promise.resolve(result);
            } else {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Email Id Valid', {}));
            }
        } catch (err) {
            console.log(err)
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },
    async getDoctorProfileStatus(user) {
        try {
            if (user.role !== constant.ROLE.SUPERADMIN && user.role !== constant.ROLE.DOCTOR) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }
            let cond = {
                doctorId: user._id
            }

            let doctorDetails = await commonDao.getOneDataByCond(cond, 'doctor')
            return Promise.resolve(doctorDetails);
        } catch (err) {
            console.log(err)
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    }
};


module.exports = AuthService;