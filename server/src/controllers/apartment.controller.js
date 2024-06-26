// const Controller = require('./controller.js');
// const apartmentService = require('../services/apartments.service.js');
// const apatrmentRepository = require('../repositories/apartment.repository.js');
// const typeCurrentApartmentRepository = require('../repositories/typeCurrentApartment.repository.js');
// const typeApartmentRepository = require('../repositories/typeApartment.repository.js');
// // const validation = require('../../..');
// const fileUpload = require('express-fileupload');
// const path = require('path');
// const fs = require('fs');
// const apartmentServiceInstance = new apartmentService(apatrmentRepository
//     , typeCurrentApartmentRepository, typeApartmentRepository);
// class ApartmentController extends Controller {
//     constructor(service) {
//         super(service);
//     }
//     async createApartment(req, res, next) {
//         try {
//             const image = req.image;
//             const apartmentData = req.body;
//             const result = await this.service.addApartment(apartmentData);
//             if (result.hasError) {
//                 res.status(404).send(result.error);
//             } else {
//                 console.log(`result.data ${JSON.stringify(result)}`);
//                 res.status(200).send(JSON.stringify(result));
//             }
//         } catch (error) {
//             console.log(error);
//             res.status(500).send('Server Error');
//         }
//     }

// }

// module.exports = new ApartmentController(apartmentServiceInstance);

// async function uploadProductImage(image) {
//     try {

//         const newImageName = `shi.png`;
//         const uploadDir = path.join(__dirname, '../../images'); // Relative path to the images directory

//         // Read the file buffer from the file object
//         const imageBuffer = image.buffer;

//         // Construct the full path to save the file
//         const imagePath = path.join(uploadDir, newImageName);

//         // Write the file buffer to the specified file path
//         await fs.promises.writeFile(imagePath, imageBuffer);

//         return `../../images/${newImageName}`;
//     } catch (error) {
//         console.error('Error uploading product image:', error);
//         throw error; // Re-throw the error to handle it in the caller function
//     }
// }

// const Controller = require('./controller.js');
// const apartmentService = require('../services/apartments.service.js');
// const apatrmentRepository = require('../repositories/apartment.repository.js');
// const typeCurrentApartmentRepository = require('../repositories/typeCurrentApartment.repository.js');
// const typeApartmentRepository = require('../repositories/typeApartment.repository.js');
// const path = require('path');
// const fs = require('fs');
// const apartmentServiceInstance = new apartmentService(apatrmentRepository, typeCurrentApartmentRepository, typeApartmentRepository);

// class ApartmentController extends Controller {


//     constructor(service) {
//         super(service);
//     }

//     async uploadApartmentImage(image) {
//         try {
//             const { v4: uuidv4 } = require('uuid');
//             const newImageName = `${uuidv4()}.png`;
//             const uploadDir = path.join(require('os').homedir(), 'Documents/imageApartment'); // Save to Desktop
//             const imageBuffer = image.buffer;
//             const imagePath = path.join(uploadDir, newImageName);
//             await fs.promises.writeFile(imagePath, imageBuffer);
//             return `Documents/imageApartment/${newImageName}`;
//         } catch (error) {
//             console.error('Error uploading product image:', error);
//             throw error;
//         }
//     }

//     async createApartment(req, res, next) {
//         try {
//             const image = req.file;
//             const apartmentData = req.body;
//             if (image) {
//                 apartmentData.imageLink = await this.uploadApartmentImage(image);
//             }
//             const result = await this.service.addApartment(apartmentData);
//             if (result.hasError) {
//                 res.status(404).send(result.error);
//             } else {
//                 console.log(`result.data ${JSON.stringify(result)}`);
//                 res.status(200).send(JSON.stringify(result));
//             }
//         } catch (error) {
//             console.log(error);
//             res.status(500).send('Server Error');
//         }
//     }
// }

// module.exports = new ApartmentController(apartmentServiceInstance);

// const Controller = require('./controller.js');
// const apartmentService = require('../services/apartments.service.js');
// const apatrmentRepository = require('../repositories/apartment.repository.js');
// const typeCurrentApartmentRepository = require('../repositories/typeCurrentApartment.repository.js');
// const typeApartmentRepository = require('../repositories/typeApartment.repository.js');
// const path = require('path');
// const fs = require('fs');
// const apartmentServiceInstance = new apartmentService(apatrmentRepository, typeCurrentApartmentRepository, typeApartmentRepository);

// class ApartmentController extends Controller {


//     constructor(service) {
//         super(service);
//     }

//     async uploadApartmentImage(image) {
//         try {
//             const { v4: uuidv4 } = require('uuid');
//             const newImageName = `${uuidv4()}.png`;
//             const uploadDir = path.join(require('os').homedir(), 'Documents/imageApartment'); // Save to Desktop
//             const imageBuffer = image.buffer;
//             const imagePath = path.join(uploadDir, newImageName);
//             await fs.promises.writeFile(imagePath, imageBuffer);
//             return `Documents/imageApartment/${newImageName}`;
//         } catch (error) {
//             console.error('Error uploading product image:', error);
//             throw error;
//         }
//     }

    // async createApartment(req, res, next) {
    //     try {
    //         const image = req.file;
    //         const apartmentData = req.body;
    //         if (image) {
    //             apartmentData.imageLink = await this.uploadApartmentImage(image);
    //         }
    //         const result = await this.service.addApartment(apartmentData);
    //         if (result.hasError) {
    //             res.status(404).send(result.error);
    //         } else {
    //             console.log(`result.data ${JSON.stringify(result)}`);
    //             res.status(200).send(JSON.stringify(result));
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).send('Server Error');
    //     }
    // }

//     async getAllApartments(req, res, next) {
//         try {
//             const apartments = await this.service.getAllApartments();
//             res.status(200).json(apartments);
//         } catch (error) {
//             console.error('Error getting all apartments:', error);
//             res.status(500).send('Server Error');
//         }
//     }
    
//     async getApartmentById(req, res, next) {
//         try {
//             const { id } = req.params;
//             console.log(id);
//             const apartment = await this.service.getApartmentById(id);
//             res.status(200).json(apartment);
//         } catch (error) {
//             console.error(`Error getting apartment with id ${id}:`, error);
//             res.status(500).send('Server Error');
//         }
//     }
// }

// module.exports = new ApartmentController(apartmentServiceInstance);


const Controller = require('./controller.js');
const apartmentService = require('../services/apartments.service.js');
const apatrmentRepository = require('../repositories/apartment.repository.js');
const typeCurrentApartmentRepository = require('../repositories/typeCurrentApartment.repository.js');
const typeApartmentRepository = require('../repositories/typeApartment.repository.js');
const path = require('path');
const fs = require('fs');
const apartmentServiceInstance = new apartmentService(apatrmentRepository, typeCurrentApartmentRepository, typeApartmentRepository);

class ApartmentController extends Controller {

    constructor(service) {
        super(service);
    }

    // async uploadApartmentImage(image) {
    //     try {
    //         const { v4: uuidv4 } = require('uuid');
    //         const newImageName = `${uuidv4()}.png`;
    //         const uploadDir = path.join(require('os').homedir(), 'Documents/imageApartment'); // Save to Desktop
    //         const imagePath = path.join(uploadDir, newImageName);
    //         await fs.promises.writeFile(imagePath, image.buffer);
    //         return imagePath; // Returning the file path
    //     } catch (error) {
    //         console.error('Error uploading product image:', error);
    //         throw error;
    //     }
    // }

    // async createApartment(req, res, next) {
    //     try {
    //         const image = req.file;
    //         const apartmentData = req.body;
    //         if (image) {
    //             apartmentData.imageLink = await this.uploadApartmentImage(image);
    //         }
    //         const result = await this.service.addApartment(apartmentData);
    //         if (result.hasError) {
    //             res.status(404).send(result.error);
    //         } else {
    //             console.log(`result.data ${JSON.stringify(result)}`);
    //             if (result.data && result.data.imagePath) {
    //                 const imageBuffer = await fs.promises.readFile(result.data.imagePath);
    //                 res.writeHead(200, {
    //                     'Content-Type': 'image/png',
    //                     'Content-Length': imageBuffer.length
    //                 });
    //                 res.end(imageBuffer);
    //             } else {
    //                 res.status(404).send('Image not found');
    //             }
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).send('Server Error');
    //     }
    // }

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
            res.status(200).json(apartments);
        } catch (error) {
            console.error('Error getting all apartments:', error);
            res.status(500).send('Server Error');
        }
    }
    // async getApartmentById(req, res, next) {
    //     try {
    //         const { id } = req.params;
    //         console.log(`-----------------------${id}--------------------------`);
    //         const apartment = await this.service.getApartmentById(id);
    //         console.log(JSON.stringify(apartment));
    //         if (apartment.data && apartment.data.imageLink) {
    //             const imagePath = path.join(require('os').homedir(), '', apartment.data.imageLink);
    //             const imageBuffer = await fs.promises.readFile(imagePath);
    //             res.writeHead(200, {
    //                 'Content-Type': 'image/png',
    //                 'Content-Length': imageBuffer.length
    //             });
    //             res.end(imageBuffer);
    //         } else {
    //             res.status(404).send('Image not found');
    //         }
    //     } catch (error) {
    //         console.error(`Error getting apartment with id :`, error);
    //         res.status(500).send('Server Error');
    //     }
    // }
    async getApartmentById(req, res, next) {
        try {
            const { id } = req.params;
            console.log(`-----------------------${id}--------------------------`);
            const apartment = await this.service.getApartmentById(id);
            console.log(JSON.stringify(apartment));
    
            if (apartment.data) {
                const imagePath = path.join(require('os').homedir(), '', apartment.data.imageLink);
                const imageBuffer = await fs.promises.readFile(imagePath);
    
                // Constructing the response object
                const responseObject = {
                    ...apartment.data, // Include all apartment data
                    image: {
                        contentType: 'image/png',
                        data: imageBuffer.toString('base64'),
                        contentLength: imageBuffer.length
                    }
                };
    
                // Sending the response
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
    
    
    
}

module.exports = new ApartmentController(apartmentServiceInstance);
