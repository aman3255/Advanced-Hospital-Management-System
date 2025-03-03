const express = require('express');
const { SignupController, SigninController } = require('./../../controller/auth.controller.js');
const authRouter = express.Router();

authRouter.post('/signup', SignupController);
authRouter.post('/signin', SigninController);

module.exports = authRouter;