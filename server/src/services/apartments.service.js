const path = require('path');
const fs = require('fs');
const { log } = require('util');
class ApartmentsService {
    constructor(apartmentRepository, typeCurrentApartmentRepository, typeApartmentRepository) {
        this.apartmentRepository = apartmentRepository;
        this.typeCurrentApartmentRepository = typeCurrentApartmentRepository;
        this.typeApartmentRepository = typeApartmentRepository;
    }

    async update(data) {
        try {
            return this.apartmentRepository.update(data);
        }
        catch (err) {
            console.log(err);
        }
    }

    async delete(id) {
        try {
            return this.apartmentRepository.delete(id);
        }
        catch (err) {
            console.log(err);
        }
    }

    async createApartment(data) {
        try {
            const apartmentData = {
                idUser: data.idUser,
                city: data.city,
                neighborhood: data.neighborhood,
                street: data.street,
                size: data.size,
                price: data.price,
                numberOfRooms: data.numberOfRooms,
                description: data.description,
                hasElevator: data.hasElevator === 'true',
                hasParking: data.hasParking === 'true',
                hasBars: data.hasBars === 'true',
                hasStorage: data.hasStorage === 'true',
                hasAirConditioning: data.hasAirConditioning === 'true',
                hasBalcony: data.hasBalcony === 'true',
                hasMamad: data.hasMamad === 'true',
                isAccessible: data.isAccessible === 'true',
                isFurnished: data.isFurnished === 'true',
                isApproved: data.isApproved === 'true',
                imageLink: data.imageLink
            };
            const apartmentResponse = await this.apartmentRepository.create(apartmentData);

            return apartmentResponse;
        } catch (err) {
            console.error('Error creating apartment:', err);
            throw err;
        }
    }

    async createTypeApartment(data, id) {
        try {
            console.log(`data.typeApartment ${data.type}`);
            const typeId = await this.typeApartmentRepository.getByType(data.type);
            console.log(`typeId ${JSON.stringify(typeId)}`);
            const typeApartmentData = {
                apartmentId: id,
                typeId: typeId.data[0].id
            };
            const typeApartmentResponse = await this.typeCurrentApartmentRepository.create(typeApartmentData);
            return typeApartmentResponse;
        } catch (err) {
            console.error('Error creating type apartment:', err);
            throw err;
        }
    }

    async addApartment(data) {
        try {
            const apartmentResponse = await this.createApartment(data);
            const typeApartmentResponse = await this.createTypeApartment(data, apartmentResponse.insertId);
            // if (!apartmentResponse.success || !typeApartmentResponse.success) {
            //     throw new Error(`Could not create apartment or type apartment`);
            // }
console.log(`typeApartmentResponse ${typeApartmentResponse}`);
            return {
                apartment: apartmentResponse,
                typeApartment: typeApartmentResponse
            };
        } catch (err) {
            console.error('Error adding apartment:', err);
            throw err;
        }
    }

    // async getAllApartments() {
    //     try {
    //         const apartmentsResponse = await this.apartmentRepository.getAll();
    //         return apartmentsResponse;
    //     } catch (err) {
    //         console.error('Error getting all apartments:', err);
    //         throw err;
    //     }
    // }

    async getAllApartments() {
        try {
            // קבלת כל הדירות
            const apartmentsResponse = await this.apartmentRepository.getAll();
            const apartmentsData = apartmentsResponse.data;

            // בדיקה אם יש דירות
            if (!apartmentsData || apartmentsData.length === 0) {
                return [];
            }

            // הוספת סוג הדירה לכל דירה
            for (let apartment of apartmentsData) {
                const typeCurrentApartment = await this.typeCurrentApartmentRepository.getById(apartment.id);
                if (typeCurrentApartment && typeCurrentApartment.data && typeCurrentApartment.data[0]) {
                    const typeApartment = await this.typeApartmentRepository.getById(typeCurrentApartment.data[0].typeId);
                    if (typeApartment && typeApartment.data && typeApartment.data[0]) {
                        apartment.type = typeApartment.data[0].type;
                    } else {
                        apartment.type = 'Unknown';
                    }
                } else {
                    apartment.type = 'Unknown';
                }
            }

            return apartmentsData;
        } catch (err) {
            console.error('Error getting all apartments:', err);
            throw err;
        }
    }



    async getApartmentById(id) {
        try {
            const apartmentResponse = await this.apartmentRepository.getById(id);
            const typeCurrentApartment = await this.typeCurrentApartmentRepository.getById(id);
            const typeApartment = await this.typeApartmentRepository.getById(typeCurrentApartment.data[0].typeId);
            const apartmentData = apartmentResponse.data;
            console.log(`apartmentData ${JSON.stringify(apartmentData)}`);
            if (apartmentData) {
                apartmentData.type = typeApartment.data[0].type;
            } else {
                throw new Error(`Apartment with id ${id} not found`);
            }
            return apartmentData;
        } catch (err) {
            console.error(`Error getting apartment with id ${id}:`, err);
            throw err;
        }
    }





    // async getApartmentByIsApproved(isApproved) {
    //     try {
    //         const apartmentResponse = await this.apartmentRepository.getByIsApproved(isApproved);
    //         return apartmentResponse;
    //     } catch (err) {
    //         console.error(`Error getting apartment with id ${id}:`, err);
    //         throw err;
    //     }
    // }

    // async getApartmentByIsApproved(isApproved) {
    //     try {
    //         const apartmentsResponse = await this.apartmentRepository.getByIsApproved(isApproved);
    //         if (apartmentsResponse.hasError || !Array.isArray(apartmentsResponse.data)) {
    //             throw new Error('Invalid response from service: Expected an object with a data array.');
    //         }

    //         const data = apartmentsResponse.data;
    //         const apartmentsWithImageData = await Promise.all(data.map(async (apartment) => {
    //             try {
    //                 if (apartment.imageLink) {
    //                     const imagePath = path.join(require('os').homedir(), '', apartment.imageLink);
    //                     const imageBuffer = await fs.promises.readFile(imagePath);
    //                     apartment.image = {
    //                         contentType: 'image/png',
    //                         data: imageBuffer.toString('base64'),
    //                         contentLength: imageBuffer.length
    //                     };
    //                 }
    //                 const typeCurrentApartment = await this.typeCurrentApartmentRepository.getById(apartment.id);
    //                 if (typeCurrentApartment.data && typeCurrentApartment.data.length > 0) {
    //                     const typeApartment = await this.typeApartmentRepository.getById(typeCurrentApartment.data[0].typeId);
    //                     apartment.type = typeApartment.data[0].type;
    //                 } else {
    //                     apartment.type = null;
    //                 }

    //                 return apartment;
    //             } catch (error) {
    //                 console.error(`Error processing apartment ${apartment.id}:`, error);
    //                 // Handle error as needed, e.g., return a default object
    //                 return { ...apartment, image: null, type: null };
    //             }
    //         }));

    //         // console.log('זה Controller 💔🤍💖💓💕');
    //         return {
    //             hasError: false,
    //             affectedRows: apartmentsResponse.affectedRows,
    //             data: apartmentsWithImageData
    //         };
    //     } catch (error) {
    //         console.error('Error fetching apartments by isApproved:', error);
    //         throw error;
    //     }
    // }



    async getApartmentByIsApproved(isApproved) {
        try {
            const apartmentsResponse = await this.apartmentRepository.getByIsApproved(isApproved);
            if (apartmentsResponse.hasError || !Array.isArray(apartmentsResponse.data)) {
                throw new Error('Invalid response from service: Expected an object with a data array.');
            }
            const data = apartmentsResponse.data;
            const apartmentsWithImageData = await Promise.all(data.map(async (apartment) => {
                try {
                    if (apartment.imageLink) {
                        const imagePath = path.join(require('os').homedir(), '', apartment.imageLink);
                        const imageBuffer = await fs.promises.readFile(imagePath);
                        apartment.image = {
                            contentType: 'image/png',
                            data: imageBuffer.toString('base64'),
                            contentLength: imageBuffer.length
                        };
                    }
                    const typeCurrentApartment = await this.typeCurrentApartmentRepository.getById(apartment.id);
                    if (typeCurrentApartment.data && typeCurrentApartment.data.length > 0) {
                        const typeApartment = await this.typeApartmentRepository.getById(typeCurrentApartment.data[0].typeId);
                        apartment.type = typeApartment.data[0].type;
                    } else {
                        apartment.type = null;
                    }
                    return apartment;
                } catch (error) {
                    console.error(`Error processing apartment ${apartment.id}:`, error);
                    // Handle error as needed, e.g., return a default object
                    return { ...apartment, image: null, type: null };
                }
            }));
            return {
                hasError: false,
                affectedRows: apartmentsResponse.affectedRows,
                data: apartmentsWithImageData
            };
        } catch (error) {
            console.error('Error fetching apartments by isApproved:', error);
            throw error;
        }
    }

    async getApartmentsByTypeAndApproval(type) {
        try {
            const apartmentsResponse = await this.apartmentRepository.getApartmentsByTypeAndApproval(type);
            if (apartmentsResponse.hasError || !Array.isArray(apartmentsResponse.data)) {
                throw new Error('Invalid response from service: Expected an object with a data array.');
            }
            const data = apartmentsResponse.data;
            const apartmentsWithImageData = await Promise.all(data.map(async (apartment) => {
                try {
                    if (apartment.imageLink) {
                        const imagePath = path.join(require('os').homedir(), '', apartment.imageLink);
                        const imageBuffer = await fs.promises.readFile(imagePath);
                        apartment.image = {
                            contentType: 'image/png',
                            data: imageBuffer.toString('base64'),
                            contentLength: imageBuffer.length
                        };
                    }
                    const typeCurrentApartment = await this.typeCurrentApartmentRepository.getById(apartment.id);
                    if (typeCurrentApartment.data && typeCurrentApartment.data.length > 0) {
                        const typeApartment = await this.typeApartmentRepository.getById(typeCurrentApartment.data[0].typeId);
                        apartment.type = typeApartment.data[0].type;
                    } else {
                        apartment.type = null;
                    }

                    return apartment;
                } catch (error) {
                    console.error(`Error processing apartment ${apartment.id}:`, error);
                    // Handle error as needed, e.g., return a default object
                    return { ...apartment, image: null, type: null };
                }
            }));

            return {
                hasError: false,
                affectedRows: apartmentsResponse.affectedRows,
                data: apartmentsWithImageData
            };
        } catch (error) {
            console.error('Error fetching apartments by isApproved:', error);
            throw error;
        }
    }


    // async getApartmentByIsApproved(isApproved) {
    //     try {
    //         const apartmentsResponse = await this.apartmentRepository.getByIsApproved(isApproved);

    //         if (apartmentsResponse.hasError || !Array.isArray(apartmentsResponse.data)) {
    //             throw new Error('Invalid response from service: Expected an object with a data array.');
    //         }

    //         const data = apartmentsResponse.data;
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

    //         return {
    //             hasError: false,
    //             affectedRows: apartmentsResponse.affectedRows,
    //             data: apartmentsWithImageData
    //         };
    //     } catch (error) {
    //         console.error('Error fetching apartments by isApproved:', error);
    //         throw error;
    //     }
    // }




}


module.exports = ApartmentsService;


