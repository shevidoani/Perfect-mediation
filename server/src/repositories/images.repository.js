const Repository = require('./repository.js');
const { pool, resultOfRequest } = require('../dbFunctions.js');
const bcrypt = require('bcrypt');

class ImagesRepository extends Repository {
    constructor() {
        super()
        this.pool = pool();
    }

    async create(data) {
        try {
            const pool = await this.pool;
            const connection = await pool.getConnection();
            const createImagesQuery = `INSERT INTO images (apartmentId, id, imageLink) VALUES (?,?, ?)`;
            const [result] = await connection.query(createImagesQuery, [data.apartmentId,data.id, data.imageLink]);
            connection.release();
            if (result.insertId > 0) {
                return resultOfRequest(false, 0, result.insertId);
            } else {
                return resultOfRequest(true, 0, 0);
            }
        } catch (error) {
            console.error('Error creating images:', error);
            return resultOfRequest(true, 0, 0);
        }
    }

    async getAll() {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createImagesQuery = `SELECT * FROM images`;
        const [result] = await connection.query(createImagesQuery);
        return await resultOfRequest(false, 0, 0, result);
    }

    async getById(apartmentId) {
        ///get by apartment id
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createImagesQuery = `SELECT * FROM images where apartmentId = ${apartmentId}`
        const [result] = await connection.query(createImagesQuery)
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
        const createImagesQuery = `UPDATE images SET ? WHERE id = ?`;
        const [result] = await connection.query(createImagesQuery, [data, data.id])
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
        const createImagesQuery = `DELETE FROM images where id = ${id}`
        const [result] = await connection.query(createImagesQuery);
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

module.exports = new ImagesRepository();