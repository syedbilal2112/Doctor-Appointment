'use strict';

/**
 *  Import DTO 
 */
const user = require('../dto/user');

/*
 * retrieve the required modules
 */
const _ = require('lodash');

const utilities = require("../../../utils/utilities");

/*
 * Add User
 */
exports.addUser = async (queryparam) => {
    return new Promise(async function (resolve, reject) {
        try {
            // let hash = utilities.encrypt(queryparam.password);
            var query = {
                name: queryparam.name,
                password: queryparam.password,
                email: queryparam.email,
                mobileNumber: queryparam.mobileNumber,
                role: queryparam.role,
                otp: queryparam.otp
            };
            if (!await user.findOne({ email: queryparam.email }))
                resolve(await user.create(query));
            else
                reject('email already exists');
        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

/*
 * Update User
 */
exports.updateUser = async (updateData) => {
    return new Promise(async function (resolve, reject) {

        try {
            resolve(await user.findOneAndUpdate({
                email: updateData.query.email
            }, updateData.update, {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }))
        } catch (err) {
            reject();
        }

    });
};


/*
 * Delete User
 */
exports.deleteUser = async (searchField) => {
    return new Promise(async function (resolve, reject) {

        try {
            resolve(await user.findByIdAndRemove({ email: searchField }))
        } catch (err) {
            reject(err);
        }
    });
};



exports.getById = (id) => {
    return user.findUser('_id', id);
};

exports.getOne = (cond) => {
    return user.find(cond);
};

exports.getByEmail = (email) => {
    return user.findUser('email', email);
};

// For Update User Detail
exports.update = (cond, userDetail) => {
    return user.updateOne(cond, { $set: userDetail });
};

exports.getByToken = (token) => {
    return user.findOne({ otp: token });
}
