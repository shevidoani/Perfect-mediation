const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function pool() {
    try {
        const dbconfig = {
            // host: process.env.HOST,
            // user: process.env.USER,
            // password: process.env.PASSWORD,
            // database: process.env.DB
            host: "127.0.0.1",
            user: "root",
            password: "214940611",
            database: "Perfect_mediation"
        };
        const pool = await mysql.createPool(dbconfig);
        return pool;
    } catch (error) {
        console.error('Error connecting to mySql:', error);
        throw error;
    }
}

async function resultOfRequest(hasError = true, affectedRows = 0, insertId = -1, data = null) {
  const resultdata = {hasError, affectedRows, insertId, data}
  return resultdata;
}

module.exports = { pool, resultOfRequest };