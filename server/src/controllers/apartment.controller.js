
const Controller = require('./controller.js');
const apartmentService = require('../services/apartments.service.js');
const apatrmentRepository = require('../repositories/apartment.repository.js');
const typeCurrentApartmentRepository = require('../repositories/typeCurrentApartment.repository.js');
const typeApartmentRepository = require('../repositories/typeApartment.repository.js');
const path = require('path');
const fs = require('fs');
const { log } = require('console');
const apartmentServiceInstance = new apartmentService(apatrmentRepository, typeCurrentApartmentRepository, typeApartmentRepository);

class ApartmentController extends Controller {

    constructor(service) {
        super(service);
    }

    async updateApartment(req, res, next) {
        try {
            const { id } = req.params;
            const updatedData = req.body;
            await this.service.update(updatedData);
            res.status(200).send(`Apartment with ID updated successfully`);
        } catch (error) {
            console.error('Error deleting apartment:', error);
            res.status(500).send('Server Error');
        }
    }

    async deleteApartment(req, res, next) {
        try {
            const { id } = req.params;
            await this.service.delete(id);
            res.status(200).send(`Apartment with ID deleted successfully`);
        } catch (error) {
            console.error('Error deleting apartment:', error);
            res.status(500).send('Server Error');
        }
    }

    async uploadApartmentImage(image) {
        try {
            const { v4: uuidv4 } = require('uuid');
            const newImageName = `${uuidv4()}.png`;
            const uploadDir = path.join(require('os').homedir(), 'Documents/imageApartment'); // Save to Desktop
            const imageBuffer = image.buffer;
            const imagePath = path.join(uploadDir, newImageName);
            await fs.promises.writeFile(imagePath, imageBuffer);
            return `Documents/imageApartment/${newImageName}`;
        } catch (error) {
            console.error('Error uploading product image:', error);
            throw error;
        }
    }

    async createApartment(req, res, next) {
        try {
            const image = req.file;
            const apartmentData = req.body;
            if (image) {
                apartmentData.imageLink = await this.uploadApartmentImage(image);
            }
            const result = await this.service.addApartment(apartmentData);
            if (result.hasError) {
                res.status(404).send(result.error);
            } else {
                console.log(`result.data ${JSON.stringify(result)}`);
                res.status(200).send(JSON.stringify(result));
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    async getAllApartments(req, res, next) {
        try {
            const apartments = await this.service.getAllApartments();

            const apartmentsWithImageData = await Promise.all(apartments.map(async (apartment) => {
                if (apartment.imageLink) {
                    const imagePath = path.join(require('os').homedir(), '', apartment.imageLink);
                    const imageBuffer = await fs.promises.readFile(imagePath);
                    apartment.image = {
                        contentType: 'image/png',
                        data: imageBuffer.toString('base64'),
                        contentLength: imageBuffer.length
                    };
                }
                return apartment;
            }));

            res.status(200).json(apartmentsWithImageData);
        } catch (error) {
            console.error('Error getting all apartments:', error);
            res.status(500).send('Server Error');
        }
    }


    async getApartmentById(req, res, next) {
        try {
            const { id } = req.params;
            const apartment = await this.service.getApartmentById(id);
            console.log(JSON.stringify(apartment));
            if (apartment) {  // שינוי מ-apartment.data ל-apartment
                const imagePath = path.join(require('os').homedir(), '', apartment.imageLink);
                const imageBuffer = await fs.promises.readFile(imagePath);

                const responseObject = {
                    ...apartment, // שימוש ב-apartment עצמו
                    image: {
                        contentType: 'image/png',
                        data: imageBuffer.toString('base64'),
                        contentLength: imageBuffer.length
                    }
                };
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                res.end(JSON.stringify(responseObject));
            } else {
                res.status(404).send('Apartment not found');
            }
        } catch (error) {
            console.error(`Error getting apartment with id :`, error);
            res.status(500).send('Server Error');
        }
    }


    // async getApartmentByIsApproved(req, res, next) {
    //     try {
    //         const { isApproved } = req.params;
    //         const apartmentsResponse = await this.service.getApartmentByIsApproved(isApproved);

    //         console.log(apartments);
    //         if (!apartments || !Array.isArray(apartments.data)) {
    //             throw new Error('Invalid response from service: Expected an object with a data array.');
    //         }

    //         const data = apartments.data;
    //         const apartmentsWithImageData = await Promise.all(data.map(async (apartment) => {
    //             if (apartment.imageLink) {
    //                 const imagePath = path.join(require('os').homedir(), '', apartment.imageLink);
    //                 const imageBuffer = await fs.promises.readFile(imagePath);
    //                 apartment.image = {
    //                     contentType: 'image/png',
    //                     data: imageBuffer.toString('base64'),
    //                     contentLength: imageBuffer.length
    //                 };
    //             }
    //             return apartment;
    //         }));

    //         res.status(200).json(apartmentsWithImageData);
    //     } catch (error) {
    //         console.error('Error getting all apartments:', error);
    //         res.status(500).send('Server Error');
    //     }
    // }

    async getApartmentByIsApproved(req, res, next) {
        try {

            const { isApproved } = req.params;
            const apartmentsResponse = await this.service.getApartmentByIsApproved(isApproved);

            if (apartmentsResponse.hasError || !Array.isArray(apartmentsResponse.data)) {
                throw new Error('Invalid response from service: Expected an object with a data array.');
            }

            const data = apartmentsResponse.data;
            const apartmentsWithImageData = await Promise.all(data.map(async (apartment) => {
                if (apartment.imageLink) {
                    const imagePath = path.join(require('os').homedir(), '', apartment.imageLink);
                    const imageBuffer = await fs.promises.readFile(imagePath);
                    apartment.image = {
                        contentType: 'image/png',
                        data: imageBuffer.toString('base64'),
                        contentLength: imageBuffer.length
                    };
                }

                return apartment;
            }));

            res.status(200).json(apartmentsWithImageData);
        } catch (error) {
            console.error('Error getting all apartments:', error);
            res.status(500).send('Server Error');
        }
    }

    async getApartmentsByTypeAndApproval(req, res, next) {
        try {

            const { typeApartment } = req.params;
            console.log(`-----------------------------------------------${typeApartment}--------------------------------`);
            const apartmentsResponse = await this.service.getApartmentsByTypeAndApproval(typeApartment);

            if (apartmentsResponse.hasError || !Array.isArray(apartmentsResponse.data)) {
                throw new Error('Invalid response from service: Expected an object with a data array.');
            }

            const data = apartmentsResponse.data;
            const apartmentsWithImageData = await Promise.all(data.map(async (apartment) => {
                if (apartment.imageLink) {
                    const imagePath = path.join(require('os').homedir(), '', apartment.imageLink);
                    const imageBuffer = await fs.promises.readFile(imagePath);
                    apartment.image = {
                        contentType: 'image/png',
                        data: imageBuffer.toString('base64'),
                        contentLength: imageBuffer.length
                    };
                }

                return apartment;
            }));

            res.status(200).json(apartmentsWithImageData);
        } catch (error) {
            console.error('Error getting all apartments:', error);
            res.status(500).send('Server Error');
        }
    }
}

module.exports = new ApartmentController(apartmentServiceInstance);

