
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

const SpecialityService = {

    /*
     * Add Speciality
     */
    async addSpeciality(req, user, schema) {
        try {
            if (!req.body) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid Speciality Detail'));
            }
            if (user.role !== constant.ROLE.DOCTOR) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }
            let payload = req.body;
            let result = await commonDao.addData(payload, schema);
            return Promise.resolve(result);
        } catch (err) {
            let message = err.message;
            let error = '';
            message.includes("duplicate") ? error = 'Speciality Data already Exists' : error = err.message;
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error));
        }
    },

    getSpecialityByFields(req, user, schema) {
        try {
            if (!req.params) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid Speciality Detail'));
            }
            if (user.role !== constant.ROLE.DOCTOR) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }
            let searchFormat = {
                "query": {
                    _id: req.params.id,
                    
                },
                "fields": {

                },
                "options": {

                }
            };
            return Promise.resolve(commonDao.getAllDataByCond(searchFormat, schema));
        } catch (err) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    getAllSpecialities(req, user, schema) {
        try {
            if (!req.params) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid Speciality Detail'));
            }
            if (user.role !== constant.ROLE.DOCTOR) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }
            return Promise.resolve(commonDao.getAllData(schema));
        } catch (err) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    updateSpeciality(req, user, schema) {
        try {
            if (!req.body) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid Speciality Detail'));
            }
            if (user.role !== constant.ROLE.DOCTOR) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }

            let payload = req.body;
            let cond = {
                _id: req.params.id
            };
            return Promise.resolve(commonDao.updateData(cond, payload, schema));
        } catch (err) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    deleteSpeciality(req, user, schema) {
        try {
            if (!req.params) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid Speciality Detail'));
            }
            if (user.role !== constant.ROLE.DOCTOR) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }
            let cond = { _id: req.params.id };
            return Promise.resolve(commonDao.deleteDataByCond(cond, schema));
        } catch (err) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    }
};


module.exports = SpecialityService;