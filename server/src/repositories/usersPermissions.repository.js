const Repository = require('./repository.js');
const { pool, resultOfRequest } = require('../dbFunctions.js');
const bcrypt = require('bcrypt');

class UserPermissionsRepository extends Repository {
    constructor() {
        super()
        this.pool = pool();
    }

    async create(data) {
        try {
            const pool = await this.pool;
            const connection = await pool.getConnection();
            const createUserPermissionsQuery = `INSERT INTO userspermissions (idUser, idPermission) VALUES (?, ?)`;
            const [result] = await connection.query(createUserPermissionsQuery, [data.idUser, data.idPermission]);
            connection.release();
            if (result.insertId > 0) {
                return resultOfRequest(false, 0, result.insertId);
            } else {
                return resultOfRequest(true, 0, 0);
            }
        } catch (error) {
            console.error('Error creating Userpermissions:', error);
            return resultOfRequest(true, 0, 0);
        }
    }

    async getAll() {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const getUserPermissionsQuery = `SELECT * FROM userspermissions`;
        const [result] = await connection.query(getUserPermissionsQuery);
        return await resultOfRequest(false, 0, 0, result);
    }

    async getByUserId(idUser) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const getUserPermissionsQuery = `SELECT * FROM userspermissions where idUser = ${idUser}`
        const [result] = await connection.query(getUserPermissionsQuery)
        if (result.length != 0) {
            return resultOfRequest(false, 0, 0, result)
        }
        else {
            return resultOfRequest(true, 0, 0);
        }
    }

    async getByPermissionId(idPermission) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const getUserPermissionsQuery = `SELECT * FROM userspermissions where idPermission = ${idPermission}`
        const [result] = await connection.query(getUserPermissionsQuery)
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
        const updateUserPermissionsQuery = `UPDATE userspermissions SET ? WHERE idUser = ?`;
        const [result] = await connection.query(updateUserPermissionsQuery, [data, data.idUser])
        if (result.affectedRows > 0) {
            return resultOfRequest(false, result.affectedRows, 0)
        }
        else {
            return resultOfRequest(true, 0, 0);
        }
    }

    // async update(data) {
    //     let connection;
    //     try {
    //         const pool = await this.pool;
    //         connection = await pool.getConnection();
    //         const createUserQuery = `UPDATE users SET ? WHERE id = ?`;
    //         const [result] = await connection.query(createUserQuery, [data, data.id]);

    //         if (result.affectedRows > 0) {
    //             return resultOfRequest(false, result.affectedRows, 0);
    //         } else {
    //             return resultOfRequest(true, 0, 0);
    //         }
    //     } catch (error) {
    //         // טיפול בשגיאה
    //         return resultOfRequest(true, 0, 0);
    //     } finally {
    //         if (connection) {
    //             connection.release(); // סגור את החיבור לאחר השימוש
    //         }
    //     }
    // }


    async delete(idUser) {
        const pool = await this.pool;
        const connection = await pool.getConnection();
        const deleteUserPermissionsQuery = `DELETE FROM userspermissions where idUser = ${idUser}`
        const [result] = await connection.query(deleteUserPermissionsQuery);
        if (result.affectedRows > 0) {
            return resultOfRequest(false, result.affectedRows, 0)
        }
        else {
            return resultOfRequest(true, 0, 0);
        }
    }
}

// const yael = new UserPermissionsRepository();
// yael.create({ 'idUser': 166, 'idPermission': 2});

module.exports = new UserPermissionsRepository();