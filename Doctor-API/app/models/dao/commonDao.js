
'use strict';

const _ = require('lodash');

const utilities = require("../../../utils/utilities");


/*
 * update details
 */
exports.updateData = async (cond, updateDetail, schema) => {
    return new Promise(async function (resolve, reject) {
        try {
            const newSchema = require('../dto/' + schema);
            resolve(await newSchema.updateOne(cond, { $set: updateDetail }));
        } catch (err) {
            reject(err)
        }
    })
};

/*
 * update details
 */
exports.updateDataByField = async (cond, updateDetail, schema) => {
    return new Promise(async function (resolve, reject) {
        try {
            const newSchema = require('../dto/' + schema);
            resolve(await newSchema.updateOne(cond, { $set: updateDetail }));
        } catch (err) {
            reject(err)
        }
    })
};

/*
 * get details
 */
exports.getAllData = async (schema) => {
    return new Promise(async function (resolve, reject) {
        try {
            const newSchema = require('../dto/' + schema);
            resolve(await newSchema.find({}));
        } catch (err) {
            reject(err)
        }
    })
};

/*
 * get All details by condition
 */
exports.getAllDataByCond = async (cond, schema) => {
    return new Promise(async function (resolve, reject) {
        try {
            const newSchema = require('../dto/' + schema);
            resolve(await newSchema.find(cond.query, cond.fields, cond.options));
        } catch (err) {
            reject(err)
        }
    })
};

/*
 * get One details by condition
 */
exports.getOneDataByCond = async (cond, schema) => {
    return new Promise(async function (resolve, reject) {
        try {
            const newSchema = require('../dto/' + schema);
            resolve(await newSchema.findOne(cond));
        } catch (err) {
            reject(err)
        }
    })
};

/*
 * get One details by condition
 */
exports.deleteDataByCond = async (cond, schema) => {
    return new Promise(async function (resolve, reject) {
        try {
            const newSchema = require('../dto/' + schema);
            resolve(await newSchema.remove(cond));
        } catch (err) {
            reject(err)
        }
    })
};

/*
 * add details by condition
 */
exports.addOrUpdateDataByCond = async (query, cond, schema) => {
    return new Promise(async function (resolve, reject) {
        try {
            const newSchema = require('../dto/' + schema);
            resolve(await newSchema.findOneAndUpdate(cond, query, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }))
        } catch (err) {
            reject(err)
        }
    })
}

/*
 * add details by condition
 */
exports.addData = async (query, schema) => {
    return new Promise(async function (resolve, reject) {
        try {
            const newSchema = require('../dto/' + schema);
            resolve(await newSchema.create(query))
        } catch (err) {
            reject(err)
        }
    })
}



/*
 * get details for Search
 */
exports.getAllDataForSearch = async (searchFormat, page, limit, schema) => {
    return new Promise(async function (resolve, reject) {
        try {
            const newSchema = require('../dto/' + schema);
            resolve(await newSchema.find(searchFormat || {}).skip(limit * page).limit(limit));
        } catch (err) {
            reject(err)
        }
    })
};

/*
 * get details for Search
 */
exports.getAllDataForAggregate = async (match, schema, project, lookup) => {
    return new Promise(async function (resolve, reject) {
        try {
            const newSchema = require('../dto/' + schema);
            resolve(await newSchema.aggregate([
                {
                    $match: match
                },
                {
                    $lookup: lookup
                },
                { 
                    $project: project 
                }
            ]));
        } catch (err) {
            reject(err)
        }
    })
};