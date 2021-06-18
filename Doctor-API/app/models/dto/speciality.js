/*
 * retrieve the required modules
 */
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
//  zone =require('./zone');

var specialitySchema = new Schema(
    {
        /****************************************************************
         *                          columns
         ****************************************************************/
        
        mainSpecialty: {
            type: String
        },
        ugCourse: {
            type: Array
        },
        pgCourse: {
            type: Array
        },
        PgDiploma: {
            type: Array
        },
        superSpecialityCourse: {
            type: Array
        }
    },
    {
        timestamps: true,
    }
);

/**
 * Define indexes
 */

/*
 * Auto increament
 */

/*
 * we need to create a model using
 * the above schema
 */
var speciality = mongoose.model("Speciality", specialitySchema);

module.exports = speciality;