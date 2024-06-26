// const Repository = require('./repository.js');
// const { pool, resultOfRequest } = require('../dbFunctions.js');
// //const bcrypt = require('bcrypt');

// class ApartmentRepository extends Repository {
//     constructor() {
//         super()
//         this.pool = pool();
//     }

//     async create(data) {
//         try {
//             const pool = await this.pool;
//             const connection = await pool.getConnection();
//             const createApartmentQuery = `INSERT INTO apartment (
//             idUser,
//             city ,
//             neighborhood ,
//             street,
//             size ,
//             price,
//             numberOfRooms,
//             description,
//             hasElevator,
//             hasParking,
//             hasBars ,
//             hasStorage,
//             hasAirConditioning,
//             hasBalcony,
//             hasMamad,
//             isAccessible,
//             isFurnished,
//             isApproved) VALUES (?, ?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?,?, ?,?)`;
//             const [result] = await connection.query(createApartmentQuery, [data.idUser,
//                 data.city ,
//                 data.neighborhood ,
//                 data.street,
//                 data.size ,
//                 data.price,
//                 data.numberOfRooms,
//                 data.description,
//                 data.hasElevator,
//                 data.hasParking,
//                 data.hasBars ,
//                 data.hasStorage,
//                 data.hasAirConditioning,
//                 data.hasBalcony,
//                 data.hasMamad,
//                 data.isAccessible,
//                 data.isFurnished,
//                 data.isApproved]);
//             connection.release();
//             if (result.insertId > 0) {
//                 console.log(resultOfRequest(false, 0, result.insertId));
//                 return resultOfRequest(false, 0, result.insertId);
//             } else {
//                 return resultOfRequest(true, 0, 0);
//             }
//         } catch (error) {
//             console.error('Error creating user:', error);
//             return resultOfRequest(true, 0, 0);
//         }
//     }

//     async getAll() {
//         const pool = await this.pool;
//         const connection = await pool.getConnection();
//         const createApartmentQuery = `SELECT * FROM apartment`;
//         const [result] = await connection.query(createApartmentQuery);
//         return await resultOfRequest(false, 0, 0, result);
//     }

//     async getById(id) {
//         const pool = await this.pool;
//         const connection = await pool.getConnection();
//         const getByIdApartmentQuery = `SELECT * FROM apartment where id = ${id}`
//         const [result] = await connection.query(getByIdApartmentQuery)
//         if (result.length != 0) {
//             return resultOfRequest(false, 0, 0, result)
//         }
//         else {
//             return resultOfRequest(true, 0, 0);
//         }
//     }


//     async update(data) {
//         const pool = await this.pool;
//         const connection = await pool.getConnection();
//         const updateApartmentQuery = `UPDATE apartment SET ? WHERE id = ?`;
//         const [result] = await connection.query(updateApartmentQuery, [data, data.id])
//         if (result.affectedRows > 0) {
//             return resultOfRequest(false, result.affectedRows, 0)
//         }
//         else {
//             return resultOfRequest(true, 0, 0);
//         }
//     }

//     // async update(data) {
//     //     let connection;
//     //     try {
//     //         const pool = await this.pool;
//     //         connection = await pool.getConnection();
//     //         const createUserQuery = `UPDATE users SET ? WHERE id = ?`;
//     //         const [result] = await connection.query(createUserQuery, [data, data.id]);
    
//     //         if (result.affectedRows > 0) {
//     //             return resultOfRequest(false, result.affectedRows, 0);
//     //         } else {
//     //             return resultOfRequest(true, 0, 0);
//     //         }
//     //     } catch (error) {
//     //         // טיפול בשגיאה
//     //         return resultOfRequest(true, 0, 0);
//     //     } finally {
//     //         if (connection) {
//     //             connection.release(); // סגור את החיבור לאחר השימוש
//     //         }
//     //     }
//     // }
    

//     async delete(id) {
//         const pool = await this.pool;
//             const connection = await pool.getConnection();
//         const deleteApartmentQuery = `DELETE FROM apartment where id = ${id}`
//         const [result] = await connection.query(deleteApartmentQuery);
//         if (result.affectedRows > 0) {
//             return resultOfRequest(false, result.affectedRows, 0)
//         }
//         else {
//             return resultOfRequest(true, 0, 0);
//         }
//     }
// }

// // const yael = new ApartmentRepository();
// // yael.create({  idUser:'162',
// //     city:'je' ,
// //     neighborhood:'fb' ,
// //     street:'fn',
// //     size:90 ,
// //     price:2000000,
// //     numberOfRooms:5,
// //     description:'vgncb  ftgcvc',
// //     hasElevator:false,
// //     hasParking:false,
// //     hasBars:false ,
// //     hasStorage:false,
// //     hasAirConditioning:false,
// //     hasBalcony:false,
// //     hasMamad:false,
// //     isAccessible:false,
// //     isFurnished:false,
// //     isApproved:false});

// module.exports = new ApartmentRepository();

// const Repository = require('./repository.js');
// const { pool, resultOfRequest } = require('../dbFunctions.js');

// class ApartmentRepository extends Repository {
//     constructor() {
//         super()
//         this.pool = pool();
//     }

//     async create(data) {
//         try {
//             const pool = await this.pool;
//             const connection = await pool.getConnection();
//             const createApartmentQuery = `INSERT INTO apartment (
//             idUser,
//             city,
//             neighborhood,
//             street,
//             size,
//             price,
//             numberOfRooms,
//             description,
//             hasElevator,
//             hasParking,
//             hasBars,
//             hasStorage,
//             hasAirConditioning,
//             hasBalcony,
//             hasMamad,
//             isAccessible,
//             isFurnished,
//             isApproved,
//             imageLink) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;
//             const [result] = await connection.query(createApartmentQuery, [
//                 data.idUser,
//                 data.city,
//                 data.neighborhood,
//                 data.street,
//                 data.size,
//                 data.price,
//                 data.numberOfRooms,
//                 data.description,
//                 data.hasElevator,
//                 data.hasParking,
//                 data.hasBars,
//                 data.hasStorage,
//                 data.hasAirConditioning,
//                 data.hasBalcony,
//                 data.hasMamad,
//                 data.isAccessible,
//                 data.isFurnished,
//                 data.isApproved,
//                 data.imageLink // הוספתי את השדה imageLink
//             ]);
//             connection.release();
//             if (result.insertId > 0) {
//                 console.log(resultOfRequest(false, 0, result.insertId));
//                 return resultOfRequest(false, 0, result.insertId);
//             } else {
//                 return resultOfRequest(true, 0, 0);
//             }
//         } catch (error) {
//             console.error('Error creating apartment:', error);
//             return resultOfRequest(true, 0, 0);
//         }
//     }

//     async getAll() {
//         const pool = await this.pool;
//         const connection = await pool.getConnection();
//         const createApartmentQuery = `SELECT * FROM apartment`;
//         const [result] = await connection.query(createApartmentQuery);
//         connection.release();
//         return resultOfRequest(false, 0, 0, result);
//     }

//     async getById(id) {
//         const pool = await this.pool;
//         const connection = await pool.getConnection();
//         const getByIdApartmentQuery = `SELECT * FROM apartment where id = ${id}`;
//         const [result] = await connection.query(getByIdApartmentQuery);
//         connection.release();
//         if (result.length != 0) {
//             return resultOfRequest(false, 0, 0, result);
//         } else {
//             return resultOfRequest(true, 0, 0);
//         }
//     }

//     async update(data) {
//         const pool = await this.pool;
//         const connection = await pool.getConnection();
//         const updateApartmentQuery = `UPDATE apartment SET ? WHERE id = ?`;
//         const [result] = await connection.query(updateApartmentQuery, [data, data.id]);
//         connection.release();
//         if (result.affectedRows > 0) {
//             return resultOfRequest(false, result.affectedRows, 0);
//         } else {
//             return resultOfRequest(true, 0, 0);
//         }
//     }

//     async delete(id) {
//         const pool = await this.pool;
//         const connection = await pool.getConnection();
//         const deleteApartmentQuery = `DELETE FROM apartment where id = ${id}`;
//         const [result] = await connection.query(deleteApartmentQuery);
//         connection.release();
//         if (result.affectedRows > 0) {
//             return resultOfRequest(false, result.affectedRows, 0);
//         } else {
//             return resultOfRequest(true, 0, 0);
//         }
//     }
// }

// module.exports = new ApartmentRepository();


const Repository = require('./repository.js');
const { pool, resultOfRequest } = require('../dbFunctions.js');

class ApartmentRepository extends Repository {
    constructor() {
        super()
        this.pool = pool();
    }

    async create(data) {
        try {
            const pool = await this.pool;
            const connection = await pool.getConnection();
            const createApartmentQuery = `INSERT INTO apartment (
                idUser,
                city,
                neighborhood,
                street,
                size,
                price,
                numberOfRooms,
                description,
                hasElevator,
                hasParking,
                hasBars,
                hasStorage,
                hasAirConditioning,
                hasBalcony,
                hasMamad,
                isAccessible,
                isFurnished,
                isApproved,
                imageLink
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const { idUser, city, neighborhood, street, size, price, numberOfRooms, description, hasElevator, hasParking, hasBars, hasStorage, hasAirConditioning, hasBalcony, hasMamad, isAccessible, isFurnished, isApproved, imageLink } = data;
            const [result] = await connection.query(createApartmentQuery, [
                idUser, city, neighborhood, street, size, price, numberOfRooms, description,
                hasElevator, hasParking, hasBars, hasStorage, hasAirConditioning, hasBalcony,
                hasMamad, isAccessible, isFurnished, isApproved, imageLink
            ]);
            connection.release();
            if (result.insertId > 0) {
                console.log(resultOfRequest(false, 0, result.insertId));
                return resultOfRequest(false, 0, result.insertId);
            } else {
                return resultOfRequest(true, 0, 0);
            }
        } catch (error) {
            console.error('Error creating apartment:', error);
            return resultOfRequest(true, 0, 0);
        }
    }

    async getAll() {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const getAllApartmentsQuery = `SELECT * FROM apartment`;
        const [results] = await connection.query(getAllApartmentsQuery);
        connection.release();
        
        const apartments = results.map(apartment => ({
            ...apartment,
            imageUrl: `${process.env.BASE_URL}/uploads/${apartment.imageLink}` // החזרת כתובת מלאה לתמונה
        }));
        
        return resultOfRequest(false, 0, 0, apartments);
    }
    
    async getById(id) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const getApartmentQuery = `SELECT * FROM apartment WHERE id = ?`;
        const [results] = await connection.query(getApartmentQuery, [id]);
        connection.release();
    
        if (results.length > 0) {
            const apartment = results[0];
            apartment.imageUrl = `${process.env.BASE_URL}/uploads/${apartment.imageLink}`; // החזרת כתובת מלאה לתמונה
            return resultOfRequest(false, 0, 0, apartment);
        } else {
            return resultOfRequest(true, 0, 0);
        }
    }
    

    async update(data) {
        try {
            const pool = await this.pool;
            const connection = await pool.getConnection();
            const { id, ...apartmentData } = data;
            const updateApartmentQuery = `UPDATE apartment SET ? WHERE id = ?`;
            const [result] = await connection.query(updateApartmentQuery, [apartmentData, id]);
            connection.release();
            if (result.affectedRows > 0) {
                return resultOfRequest(false, result.affectedRows, 0);
            } else {
                return resultOfRequest(true, 0, 0);
            }
        } catch (error) {
            console.error('Error updating apartment:', error);
            return resultOfRequest(true, 0, 0);
        }
    }

    async delete(id) {
        try {
            const pool = await this.pool;
            const connection = await pool.getConnection();
            const deleteApartmentQuery = `DELETE FROM apartment WHERE id = ?`;
            const [result] = await connection.query(deleteApartmentQuery, [id]);
            connection.release();
            if (result.affectedRows > 0) {
                return resultOfRequest(false, result.affectedRows, 0);
            } else {
                return resultOfRequest(true, 0, 0);
            }
        } catch (error) {
            console.error('Error deleting apartment:', error);
            return resultOfRequest(true, 0, 0);
        }
    }
}

module.exports = new ApartmentRepository();
