const Repository = require('./repository.js');
const { pool, resultOfRequest } = require('../dbFunctions.js');
const bcrypt = require('bcrypt');

class TypeCurrentApartmentRepository extends Repository {
    constructor() {
        super()
        this.pool = pool();
    }

    async create(data) {
        try {
            const pool = await this.pool;
            const connection = await pool.getConnection();
            const createTypeCurrentApartmentQuery = `INSERT INTO typeCurrentApartment (apartmentId,typeId) VALUES (?,?)`;
            const [result] = await connection.query(createTypeCurrentApartmentQuery, [data.apartmentId,data.typeId]);
            connection.release();
            if (result.insertId > 0) {
                return resultOfRequest(false, 0, result.insertId);
            } else {
                return resultOfRequest(true, 0, 0);
            }
        } catch (error) {
            console.error('Error creating TypeCurrentApartmentRepository:', error);
            return resultOfRequest(true, 0, 0);
        }
    }

    async getAll() {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createTypeCurrentApartmentQuery = `SELECT * FROM typeCurrentApartment`;
        const [result] = await connection.query(createTypeCurrentApartmentQuery);
        return await resultOfRequest(false, 0, 0, result);
    }

    async getById(id) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createTypeCurrentApartmentQuery = `SELECT * FROM typeCurrentApartment where apartmentId= ?`; 
        const [result] = await connection.query(createTypeCurrentApartmentQuery, [id]);
        if (result.length != 0) {
            return resultOfRequest(false, 0, 0, result);
        } else {
            return resultOfRequest(true, 0, 0);
        }
    }

    async update(data) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createTypeCurrentApartmentQuery = `UPDATE typeCurrentApartment SET ? WHERE id = ?`;
        const [result] = await connection.query(createTypeCurrentApartmentQuery, [data, data.id])
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
        const createTypeCurrentApartmentQuery = `DELETE FROM typeCurrentApartment where id = ${id}`
        const [result] = await connection.query(createTypeCurrentApartmentQuery);
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

// const my_hash = bcrypt.hashSync(password, saltRounds);
// console.log('Hashed password:', my_hash);

// const yael = new PasswordRepository();
// yael.create({'id':1,'password': my_hash});

module.exports = new TypeCurrentApartmentRepository();