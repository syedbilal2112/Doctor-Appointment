/*
 * retrieve the required modules
 */
var mongoose = require("mongoose"),
  Schema = mongoose.Schema;
//  zone =require('./zone');

var patientSchema = new Schema(
  {
    /****************************************************************
     *                          columns
     ****************************************************************/

    patientId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      index: true
    },
    patientName: {
      type: String,
      required: true
    },
    patientEmail: {
      type: String,
      required: true
    },
    patientProfilePic: {
      type: String
    },
    DOB: {
      type: Date,
      required: true
    },
    maritalStatus: {
      type: String
    },
    address: {
      type: String
    },
    mobileNumber1: {
      type: String,
      required: true
    },
    mobileNumber2: {
      type: String
    },
    husbandOrFatherName: {
      type: String
    },
    religion: {
      type: String
    },
    familyMembers: [
      {
        name: {
          type: String
        }, DOB: {
          type: Date
        }, relation: {
          type: String
        }
      }
    ],
    appointmentDetails: [
      {
        doctorId: {
          type: Schema.Types.ObjectId,
          ref: 'Doctor',
          required: true,
          index: true
        },
        Date: {
          type: Date
        },
        appointmentId: {
          type: Schema.Types.ObjectId
        }
      }
    ],
    diagnosis: {
      type: Object
    },
    treatment: {
      type: Object
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
var patient = mongoose.model("Patient", patientSchema);

module.exports = patient;
