
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

const PatientService = {

    /*
     * Add Patient
     */
    async addPatient(req, user, schema) {
        try {
            if (!req.body) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid Patient Detail'));
            }
            if (user.role !== constant.ROLE.PATIENT) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }
            let payload = req.body;
            payload['patientId'] = new ObjectID(user._id);
            payload['patientProfilePic'] = req.file ? req.file.path : '';
            let result = await commonDao.addData(payload, schema);
            return Promise.resolve(result);
        } catch (err) {
            let message = err.message;
            let error = '';
            message.includes("duplicate") ? error = 'Patient Data already Exists' : error = err.message;
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error));
        }
    },
    getPatientByFields(req, user, schema) {
        try {
            if (!req.params) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid Patient Detail'));
            }
            if (user.role !== constant.ROLE.PATIENT) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }
            let searchFormat = {
                "query": {
                    userId: new Object(user._id)
                },
                "fields": {},
                "options": {}
            };
            return Promise.resolve(commonDao.getAllDataByCond(searchFormat, schema));
        } catch (err) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    updatePatient(req, user, schema) {
        try {
            if (!req.body) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid Patient Detail'));
            }
            if (user.role !== constant.ROLE.PATIENT) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }

            let payload = req.body;
            let cond = {
                _id: user._id
            };
            return Promise.resolve(commonDao.addOrUpdateDataByCond(payload, cond, schema));
        } catch (err) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    }
};


module.exports = PatientService;