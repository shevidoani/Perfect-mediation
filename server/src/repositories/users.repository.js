const Repository = require('./repository.js');
const { pool, resultOfRequest } = require('../dbFunctions.js');
//const bcrypt = require('bcrypt');

class UsersRepository extends Repository {
    constructor() {
        super()
        this.pool = pool();
    }

    async create(data) {
        try {
            const pool = await this.pool;
            const connection = await pool.getConnection();
            const createUserQuery = `INSERT INTO users (name, email) VALUES (?, ?)`;
            const [result] = await connection.query(createUserQuery, [data.name, data.email]);
            connection.release();
            if (result.insertId > 0) {
                console.log(resultOfRequest(false, 0, result.insertId));
                return resultOfRequest(false, 0, result.insertId);
            } else {
                return resultOfRequest(true, 0, 0);
            }
        } catch (error) {
            console.error('Error creating user:', error);
            return resultOfRequest(true, 0, 0);
        }
    }

    async getAll() {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createUserQuery = `SELECT * FROM users`;
        const [result] = await connection.query(createUserQuery);
        return await resultOfRequest(false, 0, 0, result);
    }

    async getById(id) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createUserQuery = `SELECT * FROM users where id = ${id}`
        const [result] = await connection.query(createUserQuery)
        if (result.length != 0) {
            return resultOfRequest(false, 0, 0, result)
        }
        else {
            return resultOfRequest(true, 0, 0);
        }
    }

    async getByEmail(email) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createUserQuery = `SELECT * FROM users where email = "${email}"`
        const [result] = await connection.query(createUserQuery);
        if (result.length != 0) {
            return resultOfRequest(false, 0, 0, result)
        }
        else {
            return resultOfRequest(true, 0, 0);
        }
    }

    async getIfExistsByEmail(email) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createUserQuery = `SELECT * FROM users where email = "${email}"`
        const [result] = await connection.query(createUserQuery);
        if (result.length > 0) {
            return result[0];
          } else {
            // אם אין תוצאה, נחזיר null
            return null;
          }
    }

    async update(data) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createUserQuery = `UPDATE users SET ? WHERE id = ?`;
        const [result] = await connection.query(createUserQuery, [data, data.id])
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
        const createUserQuery = `DELETE FROM users where id = ${id}`
        const [result] = await connection.query(createUserQuery);
        if (result.affectedRows > 0) {
            return resultOfRequest(false, result.affectedRows, 0)
        }
        else {
            return resultOfRequest(true, 0, 0);
        }
    }
}

// const yael = new UsersRepository();
// yael.create({ name: 'yael', email: 'yael@gmail.com'});

module.exports = new UsersRepository();