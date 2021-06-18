/*
 * retrieve the required modules
 */
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
//  zone =require('./zone');

var liveTrackingSchema = new Schema(
    {
        /****************************************************************
         *                          columns
         ****************************************************************/

        doctorId: {
            type: Schema.Types.ObjectId,
            required: true
        },
        workPlaceId: {
            type: Schema.Types.ObjectId,
            required: true,
            unique: true
        },
        date: {
            type: Date
        },
        doctors: [
            {
                startTime: {
                    type: Date
                },
                endTime: {
                    type: Date
                },
                isGpsOutOfBound: {
                    type: Boolean,
                    default:false
                },
                isNetworkOutOfBound: {
                    type: Boolean,
                    default:false
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
var liveTracking = mongoose.model("LiveTracking", liveTrackingSchema);

module.exports = liveTracking;
