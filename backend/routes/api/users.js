const express = require('express');
const authController = require('../../controllers/authController');

const router = express.Router();

//http://localhost:3000/api/register 
router.post('/register', authController.register);

//http://localhost:3000/api/login
router.post('/login', auth.Controller.login);



