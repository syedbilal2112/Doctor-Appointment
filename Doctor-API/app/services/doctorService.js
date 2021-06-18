
'use strict';

/*
 * retrieve the required modules
 */
const _ = require('lodash');


/**
 *  Import DAO
 */
const commonDao = require('../models/dao/commonDao');
const constant = require('../../utils/constant');
const utilities = require('../../utils/utilities');
const res = require('../../utils/custom-response');
const mongoose = require("mongoose");

const ObjectID = mongoose.Types.ObjectId;

const DoctorService = {

    /*
     * Add Doctor
     */
    async addDoctor(req, user, schema) {
        try {
            if (!req.body) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid Doctor Detail'));
            }
            if (user.role !== constant.ROLE.DOCTOR) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }
            let payload = req.body;
            payload['doctorId'] = new ObjectID(user._id);
            payload['doctorProfilePic'] = req.file ? req.file.path : '';
            let result = await commonDao.addData(payload, schema);
            return Promise.resolve(result);
        } catch (err) {
            let message = err.message;
            let error = '';
            message.includes("duplicate") ? error = 'Doctor Data already Exists' : error = err.message;
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error));
        }
    },
    async getDoctorByFields(req, user, schema) {
        try {
            if (!req.params) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid Doctor Detail'));
            }
            if (user.role !== constant.ROLE.DOCTOR) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }
            let searchFormat = {
                "query": {
                    doctorId: new Object(user._id),

                },
                "fields": {

                },
                "options": {

                }
            };
            let match = {
                doctorId: new Object(user._id),
            }
            let project = { 'name._id': 0, 'name.isValidated': 0, 'name.password': 0, 'name.role': 0, 'name.otp': 0, 'name.createdAt': 0, 'name.updatedAt': 0, 'name.__v': 0 };
            let lookUp = {
                from: "users",
                localField: "doctorId",
                foreignField: "_id",
                as: "name"
            }
            let docDetails = await commonDao.getAllDataForAggregate(match, schema, project, lookUp);
            console.log("docDetails", docDetails);
            docDetails = docDetails.map((x, i) => {
                let temp = {
                    doctorName: x['name'][0].name,
                    email: x['name'][0].email,
                    mobileNumber: x['name'][0].mobileNumber,
                }
                return {...docDetails[i], ...temp}
            })
            return Promise.resolve(docDetails);
        } catch (err) {
            console.log(err);
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    updateDoctor(req, user, schema) {
        try {
            if (!req.body) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid Doctor Detail'));
            }
            if (user.role !== constant.ROLE.DOCTOR) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }

            let payload = req.body;
            let cond = {
                doctorId: new Object(user._id)
            };
            payload['doctorProfilePic'] = req.file ? req.file.path : '';
            return Promise.resolve(commonDao.updateData(cond, payload, schema));
        } catch (err) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    searchDoctorByFields(searchFormat, page, limit, user, schema) {
        try {
            if (!req.body) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid Doctor Detail'));
            }
            if (user.role !== constant.ROLE.DOCTOR) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }
            console.log("searchFormat", searchFormat);
            return Promise.resolve(commonDao.getAllDataForSearch(searchFormat, page, limit, schema));
        } catch (err) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    }
};


module.exports = DoctorService;