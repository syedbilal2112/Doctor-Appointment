/*
 * retrieve the required modules
 */
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
//  zone =require('./zone');

var workPlaceSchema = new Schema(
    {
        /****************************************************************
         *                          columns
         ****************************************************************/

        placeName: {
            type: String,
            required: true,
            unique: true
        },
        location: {
            type: String
        },
        address: {
            type: String
        },
        workPlacePic: {
            type: String
        },
        supportingDocuments: {
            type: Array
        },
        doctors: [
            {
                doctorId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Doctor',
                    index: true
                },
                isDoctorInLocation:{
                    type: Boolean,
                    default: false
                }
            }
        ]

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
var workPlace = mongoose.model("WorkPlace", workPlaceSchema);

module.exports = workPlace;
