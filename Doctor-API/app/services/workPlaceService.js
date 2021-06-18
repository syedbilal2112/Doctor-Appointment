
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

const WorkPlaceService = {

    /*
     * Add WorkPlace
     */
    async addWorkPlace(req, user, schema) {
        try {
            if (!req.body) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid WorkPlace Detail'));
            }
            if (user.role !== constant.ROLE.DOCTOR) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }
            let payload = req.body;
            payload['doctors'] = [
                {
                    doctorId: user._id
                }
            ]
            let result = await commonDao.addData(payload, schema);
            let doctorResult = await commonDao.getOneDataByCond({ doctorId: user._id }, 'doctor');
            let temp = {};
            temp["_id"] = result._id;
            temp["placeName"] = result.placeName;
            temp["location"] = result.location;
            temp["isDoctorInLocation"] = false;
            doctorResult['workPlace'].push(temp);
            let cond = {
                doctorId: user._id
            }
            let docRes = await commonDao.updateData(cond, doctorResult, 'doctor');
            return Promise.resolve(result);
        } catch (err) {
            let message = err.message;
            let error = '';
            message.includes("duplicate") ? error = 'WorkPlace Data already Exists' : error = err.message;
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error));
        }
    },

    getWorkPlaceByFields(req, user, schema) {
        try {
            if (!req.params) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid WorkPlace Detail'));
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

    getAllWorkPlace(req, user, schema) {
        try {
            if (!req.params) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid WorkPlace Detail'));
            }
            if (user.role !== constant.ROLE.DOCTOR) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }
            return Promise.resolve(commonDao.getAllData(schema));
        } catch (err) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    async updateWorkPlace(req, user, schema) {
        try {
            if (!req.body) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid WorkPlace Detail'));
            }
            if (user.role !== constant.ROLE.DOCTOR) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.UNAUTHORIZED, 'Unauthorized Access.'));
            }

            let payload = req.body;
            payload['doctors.$.isDoctorInLocation'] = req.body.isDoctorInLocation;
            let cond = {
                _id: req.params.id,
                "doctors.doctorId": user._id
            };
            let resWorkPlace = await commonDao.updateData(cond, payload, schema);
            let updatePayload = {};
            updatePayload["workPlace.$.placeName"] = req.body.placeName;
            updatePayload["workPlace.$.location"] = req.body.location;
            updatePayload["workPlace.$.isDoctorInLocation"] = req.body.isDoctorInLocation ? req.body.isDoctorInLocation : false
            cond = {
                doctorId: user._id,
                "workPlace._id": req.params.id
            }
            return Promise.resolve(commonDao.updateData(cond, updatePayload, 'doctor'));
        } catch (err) {
            return Promise.reject(res.error(constant.HTML_STATUS_CODE.INTERNAL_ERROR, error.message, error.stack));
        }
    },

    deleteWorkPlace(req, user, schema) {
        try {
            if (!req.params) {
                return Promise.reject(res.error(constant.HTML_STATUS_CODE.INVALID_DATA, 'Invalid Work Place Detail'));
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


module.exports = WorkPlaceService;