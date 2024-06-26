//import dotenv from 'dotenv';
const express = require('express');
const completeSignupController = require('../Controllers/completeSignup.controller');
const router = express.Router();
router.use(express.json());

router.post('/', (req, res, next) => {
    completeSignupController.completeSignup(req, res, next);
});



module.exports = router;