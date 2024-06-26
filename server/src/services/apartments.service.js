// // // const service = require('./service.js');
// // // const ApatrmentRepository = require('../repositories/apartments.repository.js');
// // class ApartmentsService{
// //     constructor(apatrmentRepository, typeCurrentApartmentRepository, typeApartmentRepository) {
// //         this.apatrmentRepository = apatrmentRepository;
// //         this.typeCurrentApartmentRepository = typeCurrentApartmentRepository;
// //         this.typeApartmentRepository = typeApartmentRepository;
// //     }
// //     async createApartment(data) {
// //         try {
// //             const apartmentData = {
// //                 'idUser': data.idUser,
// //                 'city': data.city,
// //                 'neighborhood': data.neighborhood,
// //                 'street': data.street,
// //                 'size': data.size,
// //                 'price': data.price,
// //                 'numberOfRooms': data.numberOfRooms,
// //                 'description': data.description,
// //                 'hasElevator': data.hasElevator,
// //                 'hasParking': data.hasParking,
// //                 'hasBars': data.hasBars,
// //                 'hasStorage': data.hasStorage,
// //                 'hasAirConditioning': data.hasAirConditioning,
// //                 'hasBalcony': data.hasBalcony,
// //                 'hasMamad': data.hasMamad,
// //                 'isAccessible': data.isAccessible,
// //                 'isFurnished': data.isFurnished,
// //                 'isApproved': data.isApproved
// //             };
// //             const apartmentResponse = this.apatrmentRepository.create(apartmentData);
// //             if (!apartmentResponse) {
// //                 throw new Error(`Couldn not create`);
// //             }
// //             return apartmentResponse;

// //         }
// //         catch (err) {
// //             console.log(err);
// //         }
// //     }
// //     async createTypeApartment(data,id) {
// //         try {
// //             const typeId = await this.typeApartmentRepository.getByType(data.type);
// //             if (!typeId) {
// //                 throw new Error(`Couldn not create`);
// //             }
// //             else {
// //                 const typeApartmentData = {
// //                     'apartmentId': id,
// //                     'typeId': typeId.data[0].id
// //                 };
// //                 const typeApartmentResponse = this.typeCurrentApartmentRepository.create(typeApartmentData);
// //                 if (!typeApartmentResponse) {
// //                     throw new Error(`Couldn not create`);
// //                 }
// //                 return typeApartmentResponse;
// //             }
// //         }
// //         catch (err) {
// //             console.log(err);
// //         }
// //     }
// //     async addApartment(data) {
// //         try{
// //         const apartmentResponse = await this.createApartment(data);
// //         const typeApartmentResponse = await this.createTypeApartment(data,apartmentResponse.insertId);
// //         if (!apartmentResponse ||!typeApartmentResponse) {
// //             throw new Error(`Couldn not create`);
// //         }
// //         return apartmentResponse;
// //         }
// //         catch(err) {
// //             throw err;
// //         }
// //     }
// // }


// // module.exports = ApartmentsService;

// class ApartmentsService {
//     constructor(apatrmentRepository, typeCurrentApartmentRepository, typeApartmentRepository) {
//         this.apatrmentRepository = apatrmentRepository;
//         this.typeCurrentApartmentRepository = typeCurrentApartmentRepository;
//         this.typeApartmentRepository = typeApartmentRepository;
//     }

//     async createApartment(data) {
//         try {
//             const apartmentData = {
//                 'idUser': data.idUser,
//                 'city': data.city,
//                 'neighborhood': data.neighborhood,
//                 'street': data.street,
//                 'size': data.size,
//                 'price': data.price,
//                 'numberOfRooms': data.numberOfRooms,
//                 'description': data.description,
//                 'hasElevator': data.hasElevator,
//                 'hasParking': data.hasParking,
//                 'hasBars': data.hasBars,
//                 'hasStorage': data.hasStorage,
//                 'hasAirConditioning': data.hasAirConditioning,
//                 'hasBalcony': data.hasBalcony,
//                 'hasMamad': data.hasMamad,
//                 'isAccessible': data.isAccessible,
//                 'isFurnished': data.isFurnished,
//                 'isApproved': data.isApproved,
//                 'imageLink': data.imageLink // הוספתי את שדה imageLink
//             };
//             const apartmentResponse = await this.apatrmentRepository.create(apartmentData);
//             if (!apartmentResponse) {
//                 throw new Error(`Could not create apartment`);
//             }
//             return apartmentResponse;
//         } catch (err) {
//             console.log(err);
//             throw err; // לזרוק את השגיאה כדי שנוכל לתפוס אותה ברמת הקריאה
//         }
//     }

//     async createTypeApartment(data, id) {
//         try {
//             const typeId = await this.typeApartmentRepository.getByType(data.type);
//             if (!typeId) {
//                 throw new Error(`Could not get type`);
//             } else {
//                 const typeApartmentData = {
//                     'apartmentId': id,
//                     'typeId': typeId.data[0].id
//                 };
//                 const typeApartmentResponse = await this.typeCurrentApartmentRepository.create(typeApartmentData);
//                 if (!typeApartmentResponse) {
//                     throw new Error(`Could not create type apartment`);
//                 }
//                 return typeApartmentResponse;
//             }
//         } catch (err) {
//             console.log(err);
//             throw err; // לזרוק את השגיאה כדי שנוכל לתפוס אותה ברמת הקריאה
//         }
//     }

//     async addApartment(data) {
//         try {
//             const apartmentResponse = await this.createApartment(data);
//             const typeApartmentResponse = await this.createTypeApartment(data, apartmentResponse.insertId);
//             if (!apartmentResponse || !typeApartmentResponse) {
//                 throw new Error(`Could not create apartment or type apartment`);
//             }
//             return apartmentResponse;
//         } catch (err) {
//             console.log(err);
//             throw err;
//         }
//     }
// }

// module.exports = ApartmentsService;


// class ApartmentsService {
//     constructor(apartmentRepository, typeCurrentApartmentRepository, typeApartmentRepository) {
//         this.apartmentRepository = apartmentRepository;
//         this.typeCurrentApartmentRepository = typeCurrentApartmentRepository;
//         this.typeApartmentRepository = typeApartmentRepository;
//     }

//     async createApartment(data) {
//         try {
//             const apartmentData = {
//                 'idUser': data.idUser,
//                 'city': data.city,
//                 'neighborhood': data.neighborhood,
//                 'street': data.street,
//                 'size': data.size,
//                 'price': data.price,
//                 'numberOfRooms': data.numberOfRooms,
//                 'description': data.description,
//                 'hasElevator': data.hasElevator === 'true' ? true : false, // קיבוץ ערך בוליאני
//                 'hasParking': data.hasParking === 'true' ? true : false,
//                 'hasBars': data.hasBars === 'true' ? true : false,
//                 'hasStorage': data.hasStorage === 'true' ? true : false,
//                 'hasAirConditioning': data.hasAirConditioning === 'true' ? true : false,
//                 'hasBalcony': data.hasBalcony === 'true' ? true : false,
//                 'hasMamad': data.hasMamad === 'true' ? true : false,
//                 'isAccessible': data.isAccessible === 'true' ? true : false,
//                 'isFurnished': data.isFurnished === 'true' ? true : false,
//                 'isApproved': data.isApproved === 'true' ? true : false,
//                 'imageLink': data.imageLink
//             };
//             const apartmentResponse = await this.apartmentRepository.create(apartmentData);
//             if (!apartmentResponse) {
//                 throw new Error(`Could not create apartment`);
//             }
//             return apartmentResponse;
//         } catch (err) {
//             console.error('Error creating apartment:', err);
//             throw err;
//         }
//     }

//     async createTypeApartment(data, id) {
//         try {
//             const typeId = await this.typeApartmentRepository.getByType(data.type);
//             if (!typeId) {
//                 throw new Error(`Could not get type`);
//             } else {
//                 const typeApartmentData = {
//                     'apartmentId': id,
//                     'typeId': typeId.data[0].id
//                 };
//                 const typeApartmentResponse = await this.typeCurrentApartmentRepository.create(typeApartmentData);
//                 if (!typeApartmentResponse) {
//                     throw new Error(`Could not create type apartment`);
//                 }
//                 return typeApartmentResponse;
//             }
//         } catch (err) {
//             console.error('Error creating type apartment:', err);
//             throw err;
//         }
//     }

//     async addApartment(data) {
//         try {
//             const apartmentResponse = await this.createApartment(data);
//             const typeApartmentResponse = await this.createTypeApartment(data, apartmentResponse.insertId);
//             if (!apartmentResponse || !typeApartmentResponse) {
//                 throw new Error(`Could not create apartment or type apartment`);
//             }
//             return apartmentResponse;
//         } catch (err) {
//             console.error('Error adding apartment:', err);
//             throw err;
//         }
//     }
// }

// module.exports = ApartmentsService;

class ApartmentsService {
    constructor(apartmentRepository, typeCurrentApartmentRepository, typeApartmentRepository) {
        this.apartmentRepository = apartmentRepository;
        this.typeCurrentApartmentRepository = typeCurrentApartmentRepository;
        this.typeApartmentRepository = typeApartmentRepository;
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
                imageLink: data.imageLink // קישור לתמונה מגיע ישירות מהקליינט
            };

            const apartmentResponse = await this.apartmentRepository.create(apartmentData);
            if (!apartmentResponse.success) {
                throw new Error(`Could not create apartment`);
            }

            return apartmentResponse;
        } catch (err) {
            console.error('Error creating apartment:', err);
            throw err;
        }
    }

    async createTypeApartment(data, id) {
        try {
            const typeId = await this.typeApartmentRepository.getByType(data.type);
            if (!typeId.success) {
                throw new Error(`Could not get type`);
            }

            const typeApartmentData = {
                apartmentId: id,
                typeId: typeId.data[0].id
            };

            const typeApartmentResponse = await this.typeCurrentApartmentRepository.create(typeApartmentData);
            if (!typeApartmentResponse.success) {
                throw new Error(`Could not create type apartment`);
            }

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

            if (!apartmentResponse.success || !typeApartmentResponse.success) {
                throw new Error(`Could not create apartment or type apartment`);
            }

            return {
                apartment: apartmentResponse,
                typeApartment: typeApartmentResponse
            };
        } catch (err) {
            console.error('Error adding apartment:', err);
            throw err;
        }
    }

    async getAllApartments() {
        try {
            const apartmentsResponse = await this.apartmentRepository.getAll();
            return apartmentsResponse;
        } catch (err) {
            console.error('Error getting all apartments:', err);
            throw err;
        }
    }
    
    async getApartmentById(id) {
        try {
            const apartmentResponse = await this.apartmentRepository.getById(id);
            return apartmentResponse;
        } catch (err) {
            console.error(`Error getting apartment with id ${id}:`, err);
            throw err;
        }
    }
}

module.exports = ApartmentsService;


