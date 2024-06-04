//import dotenv from 'dotenv';
const express= require('express');
const   apartmentsController= require('../Controllers/apartments.controller.js');
const router = express.Router();
router.use(express.json());

router.get('/', (req, res, next) => {
  apartmentsController.getAll(req, res, next);
});

router.post('/', (req, res, next) => {
    console.log('routes create');
    apartmentsController.create(req, res, next);
});


router.get('/:id', (req, res, next) => {
  apartmentsController.getById(req, res, next)
});


router.put('/:id', (req, res, next) => {
  apartmentsController.update(req, res, next)
});

router.delete('/:id', (req, res, next) => {
  apartmentsController.delete(req, res, next)
});

module.exports =  router;