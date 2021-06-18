/*
 * retrieve the required modules
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    const bcrypt = require('bcryptjs');
  //  zone =require('./zone');


var userSchema = new Schema({

    /****************************************************************
     *                          columns
     ****************************************************************/

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    mobileNumber: {
        type: Number
    },

    role: {
        type: String
    },

    otp: {
        type: String
    },

    isValidated: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
});

/*
 * we need to create a model using
 * the above schema
 */

userSchema.pre('save', async function (next) {
    const user = this;
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash;
    this.capacity = (this.freeMemory / (2 * 100000)) ? this.freeMemory / (2 * 100000) : 0;
    next();
})

userSchema.methods.isValidPassword = async function (password) {
    const user = this;

    const compare = await bcrypt.compare(password, user.password);
    return compare
}

const user = mongoose.model('User', userSchema);
module.exports = user;