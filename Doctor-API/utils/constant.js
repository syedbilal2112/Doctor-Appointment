
exports.PORT = 3000;
// exports.MONGO_URI = 'mongodb://localhost:27017/DB';
exports.baseURI = '/api/';
exports.HTML_STATUS_CODE = { SUCCESS: 200, CREATED: 201, UNAUTHORIZED: 401, INVALID_DATA: 406, CONFLICT: 409, INTERNAL_ERROR: 500, BAD_REQUEST: 400, NOT_FOUND: 404 };
exports.ROLE = {
    SUPERADMIN: 'SUPERADMIN', ADMIN: 'ADMIN', PATIENT: 'PATIENT', DOCTOR: 'DOCTOR', PHARMACY: 'PHARMACY', CUSTOMER: 'CUSTOMER'
};
exports.TOKEN_TIMEOUT = '100h'; // 1 hour
exports.APP_SECRETE = 'admin234admin123asdf';
exports.mongodb = {
    host: 'localhost',
    port: 27017,
    db: 'DoctorAppointment',
    username: '',
    password: ''

}

exports.lookup = {
    STATUS: ['OFF', 'RUNNING', 'BREAKDOWN', 'IDLE', 'DRYRUN'],
    USER_ROLE: ['SUPERADMIN', 'ADMIN', 'PATIENT', 'DOCTOR', 'PHARMACY',' CUSTOMER']
};

exports.MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
