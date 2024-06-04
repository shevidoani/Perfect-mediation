const Repository = require('./repository.js');
const { pool, resultOfRequest } = require('../dbFunctions.js');
const bcrypt = require('bcrypt');

class FilteringRepository extends Repository {
    constructor() {
        super()
        this.pool = pool();
    }

    async create(data) {
        try {
            const pool = await this.pool;
            const connection = await pool.getConnection();
            const createFilteringQuery = `INSERT INTO filtering (userId, highPrice, lowPrice, size, city, neighborhood,street) VALUES (?,?, ?, ?,?,?,?)`;
            const [result] = await connection.query(createFilteringQuery, [data.userId, data.highPrice, data.lowPrice, data.size, data.city, data.neighborhood, data.street]);
            connection.release();
            if (result.insertId > 0) {
                return resultOfRequest(false, 0, result.insertId);
            } else {
                return resultOfRequest(true, 0, 0);
            }
        } catch (error) {
            console.error('Error creating filtering:', error);
            return resultOfRequest(true, 0, 0);
        }
    }

    async getAll() {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createFilteringQuery = `SELECT * FROM filtering`;
        const [result] = await connection.query(createFilteringQuery);
        return await resultOfRequest(false, 0, 0, result);
    }

    async getById(userId) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createFilteringQuery = `SELECT * FROM filtering where userId = ${userId}`
        const [result] = await connection.query(createFilteringQuery)
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
        const createFilteringQuery = `UPDATE filtering SET ? WHERE id = ?`;
        const [result] = await connection.query(createFilteringQuery, [data, data.id])
        if (result.affectedRows > 0) {
            return resultOfRequest(false, result.affectedRows, 0)
        }
        else {
            return resultOfRequest(true, 0, 0);
        }
    }

    async delete(userId) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createFilteringQuery = `DELETE FROM filtering where userId = ${userId}`
        const [result] = await connection.query(createFilteringQuery);
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

module.exports = new FilteringRepository();