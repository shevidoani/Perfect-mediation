//import dotenv from 'dotenv';
const express= require('express');
const temporaryPasswordController= require('../Controllers/temporaryPassword.controller');
const router = express.Router();
router.use(express.json());

router.get('/', (req, res, next) => {
    temporaryPasswordController.getAll(req, res, next);
});

router.post('/', (req, res, next) => {
    console.log('routes create');
    temporaryPasswordController.create(req, res, next);
});


router.get('/:id', (req, res, next) => {
    temporaryPasswordController.getById(req, res, next)
});


router.put('/:id', (req, res, next) => {
    temporaryPasswordController.update(req, res, next)
});

router.delete('/:id', (req, res, next) => {
    temporaryPasswordController.delete(req, res, next)
});

module.exports =  router;