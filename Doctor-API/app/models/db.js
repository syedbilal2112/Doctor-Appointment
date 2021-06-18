
'use strict';

const mongoose = require('mongoose');
const Config = require('../../utils/constant');
const userDao = require('./dao/userDao');
const _ = require('lodash');

/*
 * add admin user
 */
function addAdminUser() {
    return new Promise(async function (resolve, reject) {
        try {
            /*
             * ADD USER ADMINISTARTOR
             */
            var user = {
                name: "SUPERADMIN",
                description: "SUPERADMIN",
                password: "welcome",
                email: "administrator@admin.com",
                mobileNumber: "9900990099",
                role: "SUPERADMIN"
            };
            resolve(await userDao.addUser(user));
        } catch (err) {
            reject(err);
        }
    });
}

async function checkAdminUser() {
    return new Promise(async function (resolve, reject) {
        try {
            /*
             * add user Administrator
             */
            var adminQuery = {
                "query": {
                    name: "SUPERADMIN",
                },
                "fields": {
                    'name': 1
                },
                "options": {
                    'limit': 1
                }
            };

            let user = await userDao.getOne(adminQuery.query);
            if (!_.isEmpty(user[0])) {
                console.log("SUPERADMIN user exists");
            } else {
                let addUser = await addAdminUser();
            }
        } catch (err) {
            let addUser = await addAdminUser();
            // reject(err);
        }
    });
}

async function dbInit() {
    try {
        let db = mongoose.connection;
        mongoose.connect(`mongodb://${Config.mongodb.host}:${Config.mongodb.port}/${Config.mongodb.db}`, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        var flag = 0
        var timer;
        timer = setInterval(() => {
            if (flag == 0) {
                console.log("connecting to database")
                mongoose.connect(`mongodb://${Config.mongodb.username}:${Config.mongodb.password}@${Config.mongodb.host}:${Config.mongodb.port}/${Config.mongodb.db}`, {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useFindAndModify: false,
                    useUnifiedTopology: true
                });
            }
        }, 6000);
        db.on('open', async function () {
            flag = 1;
            console.log('Database is connected...');
            await checkAdminUser();
        });

        db.on('error', function (err) {
            console.log(err);
            console.log('Database connection error ...');
        });
    } catch (err) {
        console.log(err);
    }
}

exports.dbInit = dbInit;