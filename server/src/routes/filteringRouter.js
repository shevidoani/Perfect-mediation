//import dotenv from 'dotenv';
const express= require('express');
const filteringController= require('../controllers/filtering.controller');
const router = express.Router();
router.use(express.json());

router.get('/', (req, res, next) => {
    filteringController.getAll(req, res, next);
});

router.post('/', (req, res, next) => {
    console.log('routes create');
    filteringController.create(req, res, next);
});


router.get('/:id', (req, res, next) => {
    filteringController.getById(req, res, next)
});


router.put('/:id', (req, res, next) => {
    filteringController.update(req, res, next)
});

router.delete('/:id', (req, res, next) => {
    filteringController.delete(req, res, next)
});

module.exports =  router;