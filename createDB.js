
const mysql = require('mysql2');
require('dotenv').config();

const dbconfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
};

const pool = mysql.createPool({
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

function createDatabase() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Successfully connected to MySQL");

    const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${process.env.DB}`;
    connection.query(createDatabaseQuery, (err) => {
      if (err) {
        console.error("Error creating database:", err);
        connection.release();
        return;
      }
      console.log("Database created successfully");
      connection.release();
    });
  });
}

// Call the function to create the database
//createDatabase();

function createTypsApartmentTable() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Successfully connected to MySQL");

    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) {
        connection.release();
        console.error("Error selecting database:", err);
        return;
      }

      const dropUserTableQuery = `DROP TABLE IF EXISTS Users`;
      connection.query(dropUserTableQuery, (err) => {
        if (err) {
          connection.release();
          console.error("Error dropping Users table:", err);
          return;
        }

        const createTypsApartmentTableQuery = `
          CREATE TABLE TypsApartment (
            id INT AUTO_INCREMENT PRIMARY KEY,
            type VARCHAR(255) NOT NULL
          )
        `;
        connection.query(createTypsApartmentTableQuery, (err) => {
          connection.release();
          if (err) {
            console.error("Error creating TypsApartment table:", err);
            return;
          }
          console.log("TypsApartment table created successfully");
        });
      });
    });
  });
}

//createTypsApartmentTable();
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
          typeId INT NOT NULL,
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

//createApartmentsTable();

function createApartmentsAndTypsTable() {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Successfully connected to MySQL");
    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) throw err;

      const createApartmentsAndTypsTableQuery = `
        CREATE TABLE IF NOT EXISTS ApartmentsAndTyps (
          apartmentId INT NOT NULL,
          typeId INT NOT NULL,
          id INT AUTO_INCREMENT PRIMARY KEY,
          FOREIGN KEY (apartmentId) REFERENCES Apartments(id) ON DELETE CASCADE,
          FOREIGN KEY (typeId) REFERENCES TypsApartment(id) ON DELETE CASCADE
      )
      `;
      connection.query(createApartmentsAndTypsTableQuery, (err) => {
        connection.release();
        if (err) throw err;
        console.log("ApartmentsAndTyps table created successfully");
      });
    });
  });
}

//createApartmentsAndTypsTable();
function createUsersTable() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Successfully connected to MySQL");

    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) {
        connection.release();
        console.error("Error selecting database:", err);
        return;
      }

      const dropUserTableQuery = `DROP TABLE IF EXISTS Users`;
      connection.query(dropUserTableQuery, (err) => {
        if (err) {
          connection.release();
          console.error("Error dropping Users table:", err);
          return;
        }

        const createUserTableQuery = `
          CREATE TABLE Users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE
          )
        `;
        connection.query(createUserTableQuery, (err) => {
          connection.release();
          if (err) {
            console.error("Error creating Users table:", err);
            return;
          }
          console.log("Users table created successfully");
        });
      });
    });
  });
}

//createUsersTable();



function createPasswordsTable() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Successfully connected to MySQL");

    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) {
        connection.release();
        console.error("Error selecting database:", err);
        return;
      }

      const createPasswordsTableQuery = `
        CREATE TABLE IF NOT EXISTS Passwords (
           id INT AUTO_INCREMENT PRIMARY KEY,
           password VARCHAR(255) NOT NULL,
           FOREIGN KEY (id) REFERENCES Users(id) ON DELETE CASCADE
        )
      `;
      connection.query(createPasswordsTableQuery, (err) => {
        connection.release();
        if (err) {
          console.error("Error creating Passwords table:", err);
          return;
        }
        console.log("Passwords table created successfully");
      });
    });
  });
}

//createPasswordsTable();

function createPermissionsTable() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Successfully connected to MySQL");

    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) {
        connection.release();
        console.error("Error selecting database:", err);
        return;
      }

      const createPermissionsTableQuery = `
        CREATE TABLE IF NOT EXISTS Permissions (
          id INT AUTO_INCREMENT PRIMARY KEY,
          type VARCHAR(255) NOT NULL
        )
      `;
      connection.query(createPermissionsTableQuery, (err) => {
        connection.release();
        if (err) {
          console.error("Error creating Permissions table:", err);
          return;
        }
        console.log("Permissions table created successfully");
      });
    });
  });
}

//createPermissionsTable();

function createUsersPermissionsTable() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Successfully connected to MySQL");

    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) {
        connection.release();
        console.error("Error selecting database:", err);
        return;
      }

      const createUsersPermissionsTableQuery = `
        CREATE TABLE IF NOT EXISTS UsersPermissions (
          idUser INT  PRIMARY KEY,
          idPermission INT NOT NULL,
          FOREIGN KEY (idUser) REFERENCES Users(id) ON DELETE CASCADE,
          FOREIGN KEY (idPermission) REFERENCES Permissions(id) ON DELETE CASCADE
        )
      `;
      connection.query(createUsersPermissionsTableQuery, (err) => {
        connection.release();
        if (err) {
          console.error("Error creating UsersPermissions table:", err);
          return;
        }
        console.log("UsersPermissions table created successfully");
      });
    });
  });
}

//createUsersPermissionsTable();

function createApartmentPermissionsTable() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Successfully connected to MySQL");

    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) {
        connection.release();
        console.error("Error selecting database:", err);
        return;
      }

      const createApartmentPermissionsTableQuery = `
        CREATE TABLE IF NOT EXISTS ApartmentPermissions (
          id INT AUTO_INCREMENT PRIMARY KEY,
          type VARCHAR(255) NOT NULL
        )
      `;
      connection.query(createApartmentPermissionsTableQuery, (err) => {
        connection.release();
        if (err) {
          console.error("Error creating ApartmentPermissions table:", err);
          return;
        }
        console.log("ApartmentPermissions table created successfully");
      });
    });
  });
}

//createApartmentPermissionsTable();

function createPermissionsForApartmentsTable() {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Successfully connected to MySQL");

    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) {
        connection.release();
        console.error("Error selecting database:", err);
        return;
      }

      const createPermissionsForApartmentsTableQuery = `
        CREATE TABLE IF NOT EXISTS PermissionsForApartments (
          idApartment INT  PRIMARY KEY,
          idPermissionApartment INT NOT NULL,
          FOREIGN KEY (idApartment) REFERENCES Apartments(id) ON DELETE CASCADE,
          FOREIGN KEY (idPermissionApartment) REFERENCES ApartmentPermissions(id) ON DELETE CASCADE
        )
      `;
      connection.query(createPermissionsForApartmentsTableQuery, (err) => {
        connection.release();
        if (err) {
          console.error("Error creating PermissionsForApartments table:", err);
          return;
        }
        console.log("PermissionsForApartments table created successfully");
      });
    });
  });
}

//createPermissionsForApartmentsTable();

function createFilteringTable() {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Successfully connected to MySQL");
    connection.query(`USE ${process.env.DB}`, (err) => {
      if (err) throw err;

      const createFilteringTableQuery = `
        CREATE TABLE IF NOT EXISTS Filtering (
          userId INT NOT NULL PRIMARY KEY,
          typeId INT NOT NULL,
          highPrice DECIMAL(10, 2) NOT NULL,
          lowPrice DECIMAL(10, 2) NOT NULL,
          size VARCHAR(50) NOT NULL,
          city VARCHAR(50) NOT NULL,
          neighborhood VARCHAR(50) NOT NULL,
          street VARCHAR(50) NOT NULL,
          FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE,
          FOREIGN KEY (typeId) REFERENCES TypsApartment(id) ON DELETE CASCADE

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





