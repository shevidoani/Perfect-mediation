const Repository = require('./repository.js');
const { pool, resultOfRequest } = require('../dbFunctions.js');
const bcrypt = require('bcrypt');

class ApatrmentRepository extends Repository {
    constructor() {
        super()
        this.pool = pool();
    }

    async create(data) {
        try {
            const pool = await this.pool;
            const connection = await pool.getConnection();
            const createApatrmentQuery = `INSERT INTO apartments (userId,price, size, city,neighborhood,street) VALUES (?,?, ?, ?,?,?)`;
            const [result] = await connection.query(createApatrmentQuery, [data.userId,data.price, data.size, data.city, data.neighborhood, data.street]);
            connection.release();
            if (result.insertId > 0) {
                return resultOfRequest(false, 0, result.insertId);
            } else {
                return resultOfRequest(true, 0, 0);
            }
        } catch (error) {
            console.error('Error creating apatrment:', error);
            return resultOfRequest(true, 0, 0);
        }
    }

    async getAll() {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createApartmentQuery = `SELECT * FROM apartments`;
        const [result] = await connection.query(createApartmentQuery);
        return await resultOfRequest(false, 0, 0, result);
    }

    async getById(id) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createApartmentQuery = `SELECT * FROM apartments where id = ${id}`
        const [result] = await connection.query(createApartmentQuery)
        if (result.length != 0) {
            return resultOfRequest(false, 0, 0, result)
        }
        else {
            return resultOfRequest(true, 0, 0);
        }
    }

    async update(data) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createApartmentQuery = `UPDATE apartments SET ? WHERE id = ?`;
        const [result] = await connection.query(createApartmentQuery, [data, data.id])
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
        const createApartmentQuery = `DELETE FROM apartments where id = ${id}`
        const [result] = await connection.query(createApartmentQuery);
        if (result.affectedRows > 0) {
            return resultOfRequest(false, result.affectedRows, 0)
        }
        else {
            return resultOfRequest(true, 0, 0);
        }
    }
}

// const yael = new ApatrmentRepository();
// yael.create({userId:2, price:120000, size:12000, city:"jerusalem",neighborhood:"ramot",street:"ramot"});

module.exports = new ApatrmentRepository();