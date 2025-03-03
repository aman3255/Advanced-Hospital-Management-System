const express = require('express');
const authRouter = require('./auth.router'); // Path relative to v1/ for auth router
const hospitalRouter = require('./hospital.router'); // Path relative to v1/ for hospital router
const v1Router = express.Router();

v1Router.use('/auth', authRouter); // Mount authRouter at /auth
v1Router.use('/hospitals', hospitalRouter); // Mount hospitalRouter at /hospitals

module.exports = v1Router;