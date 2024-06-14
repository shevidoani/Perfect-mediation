const Repository = require('./repository.js');
const { pool, resultOfRequest } = require('../dbFunctions.js');
const bcrypt = require('bcrypt');

class PermissionsRepository extends Repository {
    constructor() {
        super()
        this.pool = pool();
    }

    async create(data) {
        try {
            const pool = await this.pool;
            const connection = await pool.getConnection();
            const createPermissionsQuery = `INSERT INTO permissions (type) VALUES (?)`;
            const [result] = await connection.query(createPermissionsQuery, [data.type]);
            connection.release();
            if (result.insertId > 0) {
                return resultOfRequest(false, 0, result.insertId);
            } else {
                return resultOfRequest(true, 0, 0);
            }
        } catch (error) {
            console.error('Error creating permissions:', error);
            return resultOfRequest(true, 0, 0);
        }
    }

    async getAll() {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const getPermissionsQuery = `SELECT * FROM permissions`;
        const [result] = await connection.query(getPermissionsQuery);
        return await resultOfRequest(false, 0, 0, result);
    }

    async getById(id) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const getPermissionsQuery = `SELECT * FROM permissions where id = ${id}`
        const [result] = await connection.query(getPermissionsQuery)
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
        const updatePermissionsQuery = `UPDATE permissions SET ? WHERE id = ?`;
        const [result] = await connection.query(updatePermissionsQuery, [data, data.id])
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
        const deletePermissionsQuery = `DELETE FROM permissions where id = ${id}`
        const [result] = await connection.query(deletePermissionsQuery);
        if (result.affectedRows > 0) {
            return resultOfRequest(false, result.affectedRows, 0)
        }
        else {
            return resultOfRequest(true, 0, 0);
        }
    }
}

// const yael = new PermissionsRepository();
// yael.create({'type': 'user'});

module.exports = new PermissionsRepository();