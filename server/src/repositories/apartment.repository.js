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

    // async getAll() {
    //     const pool = await this.pool;
    //     const connection = await pool.getConnection();
    //     const getAllApartmentsQuery = `SELECT * FROM apartment`;
    //     const [results] = await connection.query(getAllApartmentsQuery);
    //     connection.release();

    //     const apartments = results.map(apartment => ({
    //         ...apartment,
    //         imageUrl: `${process.env.BASE_URL}/uploads/${apartment.imageLink}` // החזרת כתובת מלאה לתמונה
    //     }));

    //     return resultOfRequest(false, 0, 0, apartments);
    // }

    async getAll() {
        try {
            const pool = await this.pool;
            const connection = await pool.getConnection();
            const getAllApartmentsQuery = `SELECT * FROM apartment`;
            const [results] = await connection.query(getAllApartmentsQuery);
            connection.release();

            const apartments = results.map(apartment => ({
                ...apartment,
                imageUrl: `${process.env.BASE_URL}/uploads/${apartment.imageLink}` // Full image URL
            }));

            return apartments;
        } catch (err) {
            console.error('Error fetching all apartments:', err);
            throw err;
        }
    }


    // async getByIsApproved( isApproved) {
    //     // let reqIsApproved;
    //     // if(isApproved===false) {
    //     //     reqIsApproved = 0;
    //     // }else{
    //     //     reqIsApproved = 1;
    //     // }
    //     const pool = await this.pool;
    //     const connection = await pool.getConnection();
    //     const getApartmentQuery = `SELECT * FROM apartment WHERE isApproved = ?`;
    //     const [results] = await connection.query(getApartmentQuery, [isApproved]);
    //     connection.release();

    //     if (results.length > 0) {
    //         const apartment = results[0];
    //         apartment.imageUrl = `${process.env.BASE_URL}/uploads/${apartment.imageLink}`; // החזרת כתובת מלאה לתמונה
    //         return resultOfRequest(false, 0, 0, apartment);
    //     } else {
    //         return resultOfRequest(true, 0, 0);
    //     }
    // }

    // async getByIsApproved(isApproved) {
    //     const pool = await this.pool;
    //     const connection = await pool.getConnection();

    //     try {
    //         const getApartmentQuery = `SELECT * FROM apartment WHERE isApproved = ?`;
    //         const [results] = await connection.query(getApartmentQuery, [isApproved]);

    //         connection.release();

    //         if (results.length > 0) {
    //             // מיפוי על כל התוצאות להוספת כתובת מלאה לתמונות
    //             const apartments = results.map(apartment => {
    //                 apartment.imageUrl = `${process.env.BASE_URL}/uploads/${apartment.imageLink}`;
    //                 return apartment;
    //             });
    //             return resultOfRequest(false, 0, 0, apartments);
    //         } else {
    //             return resultOfRequest(true, 0, 0);
    //         }
    //     } catch (error) {
    //         connection.release();
    //         console.error('Error fetching apartments by isApproved:', error);
    //         return resultOfRequest(true, 0, 0);
    //     }
    // }


    async getByIsApproved(isApproved) {
        console.log('זה Controller 🥟🥪🥙🧀🥗🍟');

        const pool = await this.pool;
        const connection = await pool.getConnection();

        try {
            const getApartmentQuery = `SELECT * FROM apartment WHERE isApproved = ?`;
            const [results] = await connection.query(getApartmentQuery, [isApproved]);

            connection.release();

            if (results.length > 0) {
                const apartments = results.map(apartment => {
                    apartment.imageUrl = `${process.env.BASE_URL}/uploads/${apartment.imageLink}`;
                    return apartment;
                });
                console.log('זה Controller 🍃🍃🍃');

                return resultOfRequest(false, 0, 0, apartments);
            } else {
                return resultOfRequest(true, 0, 0);
            }
        } catch (error) {
            connection.release();
            console.error('Error fetching apartments by isApproved:', error);
            return resultOfRequest(true, 0, 0);
        }
    }

    async getApartmentsByTypeAndApproval(type) {
        console.log('זה Controller 🥟🥪🥙🧀🥗🍟');
    
        const pool = await this.pool;
        const connection = await pool.getConnection();
    
        try {
            const getApartmentsQuery = `
                SELECT a.*
                FROM Apartment a
                JOIN TypeCurrentApartment tca ON tca.apartmentId = a.id
                JOIN TypeApartment ta ON tca.typeId = ta.id
                WHERE ta.type = ? AND a.isApproved = 1
            `;
            const [results] = await connection.query(getApartmentsQuery, [type]);
    
            connection.release();
    
            if (results.length > 0) {
                const apartments = results.map(apartment => {
                    apartment.imageUrl = `${process.env.BASE_URL}/uploads/${apartment.imageLink}`;
                    return apartment;
                });
                console.log('זה Controller 🍃🍃🍃');
    
                return resultOfRequest(false, 0, 0, apartments);
            } else {
                return resultOfRequest(true, 0, 0);
            }
        } catch (error) {
            connection.release();
            console.error('Error fetching apartments by type and approval:', error);
            return resultOfRequest(true, 0, 0);
        }
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
            console.log(`----------------------------------------🍟 ${data}`);
            const { id, city, neighborhood, street, size, price, numberOfRooms, description,
                    hasElevator, hasParking, hasBars, hasStorage, hasAirConditioning,
                    hasBalcony, hasMamad, isAccessible, isFurnished, isApproved, imageLink } = data;
            
            const updateApartmentQuery = `
                UPDATE apartment 
                SET city = ?, 
                    neighborhood = ?, 
                    street = ?, 
                    size = ?, 
                    price = ?, 
                    numberOfRooms = ?, 
                    description = ?, 
                    hasElevator = ?, 
                    hasParking = ?, 
                    hasBars = ?, 
                    hasStorage = ?, 
                    hasAirConditioning = ?, 
                    hasBalcony = ?, 
                    hasMamad = ?, 
                    isAccessible = ?, 
                    isFurnished = ?, 
                    isApproved = ?, 
                    imageLink = ?
                WHERE id = ?
            `;
            
            const values = [
                city, neighborhood, street, size, price, numberOfRooms, description,
                hasElevator, hasParking, hasBars, hasStorage, hasAirConditioning,
                hasBalcony, hasMamad, isAccessible, isFurnished, isApproved, imageLink, id
            ];
    
            const [result] = await connection.query(updateApartmentQuery, values);
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

// const yael = new ApartmentRepository();
// yael.delete(12);

module.exports = new ApartmentRepository();

