const mysql = require('mysql2');
const bcrypt = require('bcrypt');
require('dotenv').config();

const dbconfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
};

const pool = mysql.createPool(dbconfig);

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Successfully connected to MySQL");
  const dbConnection = mysql.createConnection({
    host: dbconfig.host,
    user: dbconfig.user,
    password: dbconfig.password,
    database: dbconfig.database
  });

  dbConnection.connect((err) => {
    if (err) throw err;
    dbConnection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB}`, (err) => {
      if (err) throw err;
      console.log("Database created successfully");
      dbConnection.end();
      connection.release();
      pool.end();
    });
  });
});

function createUsersTable() {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Successfully connected to MySQL");
    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) throw err;
      const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS Users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) UNIQUE NOT NULL
        )
      `;
      connection.query(createUserTableQuery, (err) => {
        connection.release();
        if (err) throw err;
        console.log("Users table created successfully");
      });
    });
  });
}

//createUsersTable();

function createDirectorsTable() {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Successfully connected to MySQL");
    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) throw err;
      const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS Directors (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) UNIQUE NOT NULL
        )
      `;
      connection.query(createUserTableQuery, (err) => {
        connection.release();
        if (err) throw err;
        console.log("Directors table created successfully");
      });
    });
  });
}

createDirectorsTable();

function createPasswordsTable() {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Successfully connected to MySQL");
    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) throw err;

      const createPasswordsTableQuery = `
        CREATE TABLE IF NOT EXISTS Passwords (
           id INT PRIMARY KEY,
           password VARCHAR(255) NOT NULL,
           FOREIGN KEY (id) REFERENCES Users(id) ON DELETE CASCADE
        )
      `;
      connection.query(createPasswordsTableQuery, (err) => {
        connection.release();
        if (err) throw err;
        console.log("Passwords table created successfully");
      });
    });
  });
}

//createPasswordsTable();

function createFilteringTable() {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Successfully connected to MySQL");
    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) throw err;

      const createFilteringTableQuery = `
        CREATE TABLE IF NOT EXISTS Filtering (
          userId INT NOT NULL PRIMARY KEY,
          highPrice DECIMAL(10, 2) NOT NULL,
          lowPrice DECIMAL(10, 2) NOT NULL,
          size VARCHAR(50) NOT NULL,
          city VARCHAR(50) NOT NULL,
          neighborhood VARCHAR(50) NOT NULL,
          street VARCHAR(50) NOT NULL,
          FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
      )
      `;
      connection.query(createFilteringTableQuery, (err) => {
        connection.release();
        if (err) throw err;
        console.log("Filtering table created successfully");
      });
    });
  });
}

//createFilteringTable();

function createApartmentsTable() {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Successfully connected to MySQL");
    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) throw err;

      const createApartmentsTableQuery = `
        CREATE TABLE IF NOT EXISTS Apartments (
          userId INT NOT NULL,
          id INT AUTO_INCREMENT PRIMARY KEY,
          price DECIMAL(10, 2) NOT NULL,
          size VARCHAR(50) NOT NULL,
          city VARCHAR(50) NOT NULL,
          neighborhood VARCHAR(50) NOT NULL,
          street VARCHAR(50) NOT NULL,
          FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
      )
      `;
      connection.query(createApartmentsTableQuery, (err) => {
        connection.release();
        if (err) throw err;
        console.log("Apartments table created successfully");
      });
    });
  });
}


createApartmentsWaitingTable();

function createApartmentsWaitingTable() {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Successfully connected to MySQL");
    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) throw err;

      const createApartmentsWaitingTableQuery = `
        CREATE TABLE IF NOT EXISTS ApartmentsWaiting (
          userId INT NOT NULL,
          id INT AUTO_INCREMENT PRIMARY KEY,
          price DECIMAL(10, 2) NOT NULL,
          size VARCHAR(50) NOT NULL,
          city VARCHAR(50) NOT NULL,
          neighborhood VARCHAR(50) NOT NULL,
          street VARCHAR(50) NOT NULL,
          FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
      )
      `;
      connection.query(createApartmentsWaitingTableQuery, (err) => {
        connection.release();
        if (err) throw err;
        console.log("ApartmentsWaiting table created successfully");
      });
    });
  });
}


//createApartmentsTable();

function createImagesTable() {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Successfully connected to MySQL");
    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) throw err;

      const createImagesTableQuery = `
        CREATE TABLE IF NOT EXISTS Images (
          apartmentId INT NOT NULL,
          id INT AUTO_INCREMENT PRIMARY KEY,
          imageLink VARCHAR(255),
          FOREIGN KEY (apartmentId) REFERENCES Apartments(id) ON DELETE CASCADE
      )
      `;
      connection.query(createImagesTableQuery, (err) => {
        connection.release();
        if (err) throw err;
        console.log("Images table created successfully");
      });
    });
  });
}


//createImagesTable();

function createAdvertisingsTable() {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Successfully connected to MySQL");
    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) throw err;

      const createAdvertisingsTableQuery = `
        CREATE TABLE IF NOT EXISTS Advertisements (
          id INT AUTO_INCREMENT PRIMARY KEY,
          imageLink VARCHAR(255)
        )
      `;
      connection.query(createAdvertisingsTableQuery, (err) => {
        connection.release();
        if (err) throw err;
        console.log("Advertisements table created successfully");
      });
    });
  });
}


//createAdvertisingsTable();




