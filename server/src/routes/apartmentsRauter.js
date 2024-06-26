// // //import dotenv from 'dotenv';
// // const express= require('express');
// // const   apartmentController= require('../Controllers/apartment.controller');
// // const router = express.Router();
// // router.use(express.json());
// // const multer = require('multer');
// // const upload = multer();

// // // router.get('/', (req, res, next) => {
// // //   apartmentController.getAll(req, res, next);
// // // });

// // router.post('/',upload.single('image'), (req, res, next) => {
// //     console.log('routes create');
// //     apartmentController.createApartment(req, res, next);
// // });


// // // router.get('/:id', (req, res, next) => {
// // //   apartmentController.getById(req, res, next)
// // // });


// // router.put('/:id', (req, res, next) => {
// //   apartmentController.update(req, res, next)
// // });

// // router.delete('/:id', (req, res, next) => {
// //   apartmentController.delete(req, res, next)
// // });

// // module.exports =  router;

// const express = require('express');
// const apartmentController = require('../Controllers/apartment.controller');
// const router = express.Router();
// router.use(express.json());
// const multer = require('multer');
// const upload = multer();

// router.post('/', upload.single('image'), (req, res, next) => {
//     console.log('routes create');
//     apartmentController.createApartment(req, res, next);
// });

// router.put('/:id', (req, res, next) => {
//   apartmentController.update(req, res, next)
// });

// router.delete('/:id', (req, res, next) => {
//   apartmentController.delete(req, res, next)
// });

// module.exports = router;

const express = require('express');
const apartmentController = require('../Controllers/apartment.controller');
const router = express.Router();
const multer = require('multer');
const upload = multer();

router.use(express.json());

router.get('/', (req, res, next) => {
    apartmentController.getAllApartments(req, res, next);
});

router.get('/:id', (req, res, next) => {
    apartmentController.getApartmentById(req, res, next);
});

router.post('/', upload.single('image'), (req, res, next) => {
    console.log('routes create');
    apartmentController.createApartment(req, res, next);
});

router.put('/:id', (req, res, next) => {
    apartmentController.update(req, res, next);
});

router.delete('/:id', (req, res, next) => {
    apartmentController.delete(req, res, next);
});

module.exports = router;

