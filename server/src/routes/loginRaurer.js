//import dotenv from 'dotenv';
const express = require('express');
const loginController = require('../Controllers/login.controller');
const router = express.Router();
router.use(express.json());

router.post('/', (req, res, next) => {
    console.log('routes create');
    loginController.login(req, res, next);
});


module.exports = router;