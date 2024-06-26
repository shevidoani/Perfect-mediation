const Repository = require('./repository.js');
const { pool, resultOfRequest } = require('../dbFunctions.js');
const bcrypt = require('bcrypt');

class TypeApartmentRepository extends Repository {
    constructor() {
        super()
        this.pool = pool();
    }

    async create(data) {
        try {
            const pool = await this.pool;
            const connection = await pool.getConnection();
            const createTypeApartmentQuery = `INSERT INTO typeApartment (type) VALUES (?)`;
            const [result] = await connection.query(createTypeApartmentQuery, [data.type]);
            connection.release();
            if (result.insertId > 0) {
                return resultOfRequest(false, 0, result.insertId);
            } else {
                return resultOfRequest(true, 0, 0);
            }
        } catch (error) {
            console.error('Error creating TypeApartment:', error);
            return resultOfRequest(true, 0, 0);
        }
    }

    async getAll() {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createTypeApartmentQuery = `SELECT * FROM typeApartment`;
        const [result] = await connection.query(createTypeApartmentQuery);
        return await resultOfRequest(false, 0, 0, result);
    }

    async getById(id) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createTypeApartmentQuery = `SELECT * FROM typeApartment where id= ?`; 
        const [result] = await connection.query(createTypeApartmentQuery, [id]);
        if (result.length != 0) {
            return resultOfRequest(false, 0, 0, result);
        } else {
            return resultOfRequest(true, 0, 0);
        }
    }

    async getByType(type) {
        try {
            const pool = await this.pool;
            const connection = await pool.getConnection();
            
            // Using parameterized query to avoid SQL injection
            const createTypeApartmentQuery = `SELECT * FROM typeApartment where type = ?`;
            const [result] = await connection.query(createTypeApartmentQuery, [type]);
    
            // Close connection after query execution
            await connection.release();
    
            if (result.length !== 0) {
                return resultOfRequest(false, 0, 0, result);
            } else {
                return resultOfRequest(true, 0, 0);
            }
        } catch (error) {
            console.error('Error fetching permissions:', error);
            throw new Error('Failed to fetch permissions');
        }
    }

    // async getPasswordById(id) {
    //     const pool = await this.pool;
    //     const connection = await pool.getConnection();
    //     const getPasswordQuery = `SELECT password FROM typeApartment WHERE id = ?`; 
    //     const [result] = await connection.query(getPasswordQuery, [id]);
    //     connection.release();
    //     if (result.length !== 0) {
    //         return result[0].password;
    //     } else {
    //         throw new Error('Password not found for the provided id');
    //     }
    // }
    

    async update(data) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createTypeApartmentQuery = `UPDATE typeApartment SET ? WHERE id = ?`;
        const [result] = await connection.query(createTypeApartmentQuery, [data, data.id])
        if (result.affectedRows > 0) {
            return resultOfRequest(false, result.affectedRows, 0)
        }
        else {
            return resultOfRequest(true, 0, 0);
        }
    }

    async delete(id) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createTypeApartmentQuery = `DELETE FROM typeApartment where id = ${id}`
        const [result] = await connection.query(createTypeApartmentQuery);
        if (result.affectedRows > 0) {
            return resultOfRequest(false, result.affectedRows, 0)
        }
        else {
            return resultOfRequest(true, 0, 0);
        }
    }
}
// const password = '214940611';
// const saltRounds = 10;

// // const my_hash = bcrypt.hashSync(password, saltRounds);
// // console.log('Hashed password:', my_hash);

// const yael = new TypeApartmentRepository();
// yael.create({'type':'for rent'});

module.exports = new TypeApartmentRepository();