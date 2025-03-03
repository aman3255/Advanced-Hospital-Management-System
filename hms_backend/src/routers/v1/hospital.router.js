const express = require('express');
const { createHospital, listAllTheHospital, singleHospital } = require('./../../controller/hospital.controller');
const { userLoginOrNot } = require('./../../middlewares/user.middleware'); // Corrected path
const { updateHospital } = require('./../../controller/update.controller');
const { deleteHospital } = require('./../../controller/delete.controller');
const { findAllHospitalByCity } = require('./../../controller/city.controller');
const { addHospitalDetails } = require('./../../controller/details.controller'); // Corrected 'details' to 'detail'

const hospitalRouter = express.Router();

hospitalRouter.use(userLoginOrNot);

// Routes
hospitalRouter.post('/create', createHospital);
hospitalRouter.get('/all', listAllTheHospital);        // Static route first
hospitalRouter.get('/:city', findAllHospitalByCity);   // Dynamic route

hospitalRouter.get('/single/:id([0-9a-fA-F]{24})', singleHospital);
hospitalRouter.put('/update/:id', updateHospital);
hospitalRouter.delete('/delete/:id', deleteHospital);
hospitalRouter.post('/details/:id', addHospitalDetails);

module.exports = hospitalRouter;