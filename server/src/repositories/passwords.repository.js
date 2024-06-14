const Repository = require('./repository.js');
const { pool, resultOfRequest } = require('../dbFunctions.js');
const bcrypt = require('bcrypt');

class PasswordRepository extends Repository {
    constructor() {
        super()
        this.pool = pool();
    }

    async create(data) {
        try {
            const pool = await this.pool;
            const connection = await pool.getConnection();
            const createPasswordsQuery = `INSERT INTO passwords (id,password) VALUES (?,?)`;
            const [result] = await connection.query(createPasswordsQuery, [data.id,data.password]);
            connection.release();
            if (result.insertId > 0) {
                return resultOfRequest(false, 0, result.insertId);
            } else {
                return resultOfRequest(true, 0, 0);
            }
        } catch (error) {
            console.error('Error creating passwords:', error);
            return resultOfRequest(true, 0, 0);
        }
    }

    async getAll() {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const createPasswordsQuery = `SELECT * FROM passwords`;
        const [result] = await connection.query(createPasswordsQuery);
        return await resultOfRequest(false, 0, 0, result);
    }

    async getById(id) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const getPassworsQuery = `SELECT * FROM passwords where id= ?`; 
        const [result] = await connection.query(getPassworsQuery, [id]);
        if (result.length != 0) {
            return resultOfRequest(false, 0, 0, result);
        } else {
            return resultOfRequest(true, 0, 0);
        }
    }

    async getPasswordById(id) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const getPasswordQuery = `SELECT password FROM passwords WHERE id = ?`; 
        const [result] = await connection.query(getPasswordQuery, [id]);
        connection.release();
        if (result.length !== 0) {
            return result[0].password;
        } else {
            throw new Error('Password not found for the provided id');
        }
    }
    

    async update(data) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const updatePasswordQuery = `UPDATE passwords SET ? WHERE id = ?`;
        const [result] = await connection.query(updatePasswordQuery, [data, data.id])
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
        const deletePasswordQuery = `DELETE FROM passwords where id = ${id}`
        const [result] = await connection.query(deletePasswordQuery);
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

// const yael = new PasswordRepository();
// yael.create({'id':1,'password': my_hash});

module.exports = new PasswordRepository();