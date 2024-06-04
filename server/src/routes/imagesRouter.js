//import dotenv from 'dotenv';
const express= require('express');
const imagesController= require('../controllers/images.controller');
const router = express.Router();
router.use(express.json());

router.get('/', (req, res, next) => {
    imagesController.getAll(req, res, next);
});

router.post('/', (req, res, next) => {
    console.log('routes create');
    imagesController.create(req, res, next);
});


router.get('/:id', (req, res, next) => {
    imagesController.getById(req, res, next)
});


router.put('/:id', (req, res, next) => {
    imagesController.update(req, res, next)
});

router.delete('/:id', (req, res, next) => {
    imagesController.delete(req, res, next)
});

module.exports =  router;