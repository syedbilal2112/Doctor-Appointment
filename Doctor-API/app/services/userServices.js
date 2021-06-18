
'use strict';

const bcrypt = require('bcryptjs');

var passwordHash = function(password){
    return bcrypt.hashSync(password);
}

module.exports = {
    passwordHash: passwordHash
}