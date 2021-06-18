/*
 * retrieve the required modules
 */
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
//  zone =require('./zone');

var doctorSchema = new Schema(
    {
        /****************************************************************
         *                          columns
         ****************************************************************/

        doctorId: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true,
            index: true
        },
        doctorName: {
            type: String,
            required: true
        },
        doctorProfilePic: {
            type: String
        },
        gender: {
            type: String,
            required: true
        },
        dob: {
            type: Date,
            required: true
        },
        licenceNumber: {
            type: Date,
            required: true
        },
        address: {
            type: Date,
            required: true
        },
        educationalQualification: [
            {
                name: {
                    type: String
                }
            }
        ],
        mainSpecialty: {
            type: String,
            required: true
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
        },
        supportingDocuments: {
            type: Array
        },
        rating: {
            type: Object
        },
        isDoctorAtLocation: {
            type: Boolean,
            default: false
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        workPlace: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    ref: 'WorkPlace'
                },
                placeName: {
                    type: String
                },
                location: {
                    type: String
                },
                isDoctorInLocation: {
                    type: Boolean,
                    default: false
                }
            }
        ],
        appointmentSchedule: [ //avaliable time
            {
                _id: {
                    type: Schema.Types.ObjectId
                },
                fromTime: {
                    type: String,    //14:00:00,
                },
                toTime: {
                    type: String,//14:59:59,
                },
                isBreak: {
                    type: Boolean,//true,
                },
                typeOfBreak: {
                    type: String,//Lunch // Lunch,personal, tea, other
                    required: false
                }
            }
        ],
        workingDays: {
            type: Array
        },
        isProfileComplete:{
            type: Boolean,
            default: false
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
var doctor = mongoose.model("Doctor", doctorSchema);

module.exports = doctor;
