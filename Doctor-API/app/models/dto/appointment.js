/*
 * retrieve the required modules
 */
var mongoose = require("mongoose"),
    Schema = mongoose.Schema;
//  zone =require('./zone');

var appointmentSchema = new Schema(
    {
        /****************************************************************
         *                          columns
         ****************************************************************/

        doctorId: {
            type: Schema.Types.ObjectId,
            ref: 'Doctor',
            required: true,
            index: true
        },
        date: {
            type: Date,
            required: true,
            index: true
        },
        appointmentDetails: [
            {
                _id: {
                    type: Schema.Types.ObjectId,
                    index: true
                },
                patientId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                    required: true,
                    index: true
                },
                fromTime: {
                    type: String,
                    required: true
                },
                toTime: {
                    type: String,
                    required: true
                },
                duration: {
                    type: String,
                    required: true
                },
                isAccepted: {
                    type: Boolean,
                    default: false
                },
                isComplete: {
                    type: Boolean,
                    default: false
                },
                isCancelled: {
                    type: Boolean,
                    default: false
                },
                description: {
                    type: String
                },
                rating:{
                    type: Number
                },
                workPlace: [
                    {
                        _id: {
                            type: Schema.Types.ObjectId,
                            ref: 'workPlace',
                            required: true
                        },
                        name: {
                            type: String
                        }
                    }
                ]
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
var appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = appointment;
