

const express = require('express');
const apartmentController = require('../Controllers/apartment.controller');
const router = express.Router();
const multer = require('multer');
const upload = multer();

router.use(express.json());

router.get('/', (req, res, next) => {
    apartmentController.getAllApartments(req, res, next);
});

// router.get('/:param', (req, res, next) => {
//     const { param } = req.params;

//     // Check if param is a number
//     if (!isNaN(param)) {
//         req.params.id = param;
//         return apartmentController.getApartmentById(req, res, next);
//     }

//     // Check if param is a boolean
//     if (param === 'true' || param === 'false') {
//         req.params.isApproved = param === 'true';
//         return apartmentController.getApartmentByIsApproved(req, res, next);
//     }

//     // If param doesn't match any expected format
//     res.status(400).send('Invalid parameter');
// });

router.get('/:id', (req, res, next) => {
    apartmentController.getApartmentById(req, res, next);
});

router.get('/isApproved/:isApproved', (req, res, next) => {
    console.log('זה Controller 😄😃😂😁😀');
    apartmentController.getApartmentByIsApproved(req, res, next);
});

router.get('/typeApartment/:typeApartment', (req, res, next) => {
    console.log('זה Controller 😄😃😂😁😀');
    apartmentController.getApartmentsByTypeAndApproval(req, res, next);
});

router.post('/', upload.single('image'), (req, res, next) => {
    console.log('routes create');
    apartmentController.createApartment(req, res, next);
});

router.put('/:id', (req, res, next) => {
    apartmentController.updateApartment(req, res, next);
});

router.delete('/:id', (req, res, next) => {
    apartmentController.deleteApartment(req, res, next);
});

module.exports = router;


