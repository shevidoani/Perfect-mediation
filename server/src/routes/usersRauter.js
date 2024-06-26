//import dotenv from 'dotenv';
const express= require('express');
const usersController= require('../Controllers/users.controller');
const router = express.Router();
router.use(express.json());

router.get('/', (req, res, next) => {
  usersController.getAll(req, res, next);
});

router.post('/', (req, res, next) => {
    console.log('routes create');
    usersController.create(req, res, next);
});


router.get('/:id', (req, res, next) => {
  usersController.getById(req, res, next)
});


router.put('/:id', (req, res, next) => {
  usersController.update(req, res, next)
});

router.delete('/:id', (req, res, next) => {
  usersController.delete(req, res, next)
});

module.exports =  router;