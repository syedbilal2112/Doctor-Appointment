
const express = require('express');
const constant = require('../../utils/constant');
const isAuthenticate = require('../../app/services/token-service');
const patientService = require('../services/patientService');
const doctorService = require('../services/doctorService');
const specialityService = require('../services/specialityService');
const workPlaceService = require('../services/workPlaceService');
const route = express.Router();


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + file.originalname)
    }
})
const fileFilter = function (req, file, cb) {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

// API FOR PATIENTS START

route.post('/patient', upload.single('profilePic'), isAuthenticate, (req, res) => {
    patientService.addPatient(req, req.user, 'patient').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.get('/patient', isAuthenticate, (req, res) => {
    patientService.getPatientByFields(req, req.user, 'patient').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.put('/patient', upload.single('profilePic'), isAuthenticate, (req, res) => {
    patientService.updatePatient(req, req.user, 'patient').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

// API FOR PATIENT ENDS



// API FOR DOCTOR STARTS

route.post('/doctor', upload.single('profilePic'), isAuthenticate, (req, res) => {
    doctorService.addDoctor(req, req.user, 'doctor').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.get('/doctor', isAuthenticate, (req, res) => {
    doctorService.getDoctorByFields(req, req.user, 'doctor').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.put('/doctor', upload.single('profilePic'), isAuthenticate, (req, res) => {
    doctorService.updateDoctor(req, req.user, 'doctor').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});




route.get('/searchDoctor', isAuthenticate, (req, res) => {
    let limit = Math.abs(+req.query.limit) || 5;
    let page = (Math.abs(+req.query.page) || 1) - 1;
    let searchFormat = undefined;
    if (req.query.filter && req.query.search) {
        searchFormat = {};
        searchFormat[req.query.filter] = { $regex: ".*" + req.query.search + ".*" }
    }
    doctorService.searchDoctorByFields(searchFormat, page, limit, req.user, 'doctor').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});


// API FOR DOCTOR ENDS



// API FOR SPECIALITY STARTS

route.post('/speciality', isAuthenticate, (req, res) => {
    specialityService.addSpeciality(req, req.user, 'speciality').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.get('/speciality/:id', isAuthenticate, (req, res) => {
    specialityService.getSpecialityByFields(req, req.user, 'speciality').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.get('/speciality', isAuthenticate, (req, res) => {
    specialityService.getAllSpecialities(req, req.user, 'speciality').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.put('/speciality/:id', isAuthenticate, (req, res) => {
    specialityService.updateSpeciality(req, req.user, 'speciality').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.delete('/speciality/:id', isAuthenticate, (req, res) => {
    specialityService.deleteSpeciality(req, req.user, 'speciality').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

// API FOR SPECIALITY ENDS




// API FOR WORK PLACE STARTS

route.post('/workPlace', isAuthenticate, (req, res) => {
    workPlaceService.addWorkPlace(req, req.user, 'workPlace').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.get('/workPlace/:id', isAuthenticate, (req, res) => {
    workPlaceService.getWorkPlaceByFields(req, req.user, 'workPlace').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.get('/workPlace', isAuthenticate, (req, res) => {
    workPlaceService.getAllWorkPlace(req, req.user, 'workPlace').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});

route.put('/workPlace/:id', isAuthenticate, (req, res) => {
    workPlaceService.updateWorkPlace(req, req.user, 'workPlace').then((result) => {
        res.status(constant.HTML_STATUS_CODE.SUCCESS).json(result);
    }).catch((error) => {
        res.status(error.status || constant.HTML_STATUS_CODE.INTERNAL_ERROR).json(error);
    });
});


// API FOR WORK PLACE ENDS

module.exports = route;