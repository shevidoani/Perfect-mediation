//import dotenv from 'dotenv';
const express= require('express');
const apartmentsWaitingController= require('../Controllers/apartmentsWaiting.controller');

const router = express.Router();
router.use(express.json());

router.get('/', (req, res, next) => {
    apartmentsWaitingController.getAll(req, res, next);
});

router.post('/', (req, res, next) => {
    console.log('routes create');
    apartmentsWaitingController.create(req, res, next);
});


router.get('/:id', (req, res, next) => {
    apartmentsWaitingController.getById(req, res, next)
});


router.put('/:id', (req, res, next) => {
    apartmentsWaitingController.update(req, res, next)
});

router.delete('/:id', (req, res, next) => {
    apartmentsWaitingController.delete(req, res, next)
});

module.exports =  router;