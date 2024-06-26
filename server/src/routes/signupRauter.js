//import dotenv from 'dotenv';
const express = require('express');
const signupController = require('../Controllers/signup.controller');
const router = express.Router();
router.use(express.json());

router.post('/', (req, res, next) => {
    signupController.signup(req, res, next);
});



module.exports = router;