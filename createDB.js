
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

// function createUsersPermissionsTable() {
//   pool.getConnection((err, connection) => {
//     if (err) {
//       console.error("Error connecting to MySQL:", err);
//       return;
//     }
//     console.log("Successfully connected to MySQL");

//     connection.query(`USE ${process.env.DB}`, (err) => {
//       if (err) {
//         connection.release();
//         console.error("Error selecting database:", err);
//         return;
//       }

//       const createUsersPermissionsTableQuery = `
//         CREATE TABLE IF NOT EXISTS UsersPermissions (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//           idUser INT  not null,
//           idPermission INT NOT NULL,
//           FOREIGN KEY (idUser) REFERENCES Users(id) ON DELETE CASCADE,
//           FOREIGN KEY (idPermission) REFERENCES Permissions(id) ON DELETE CASCADE
//         )
//       `;
//       connection.query(createUsersPermissionsTableQuery, (err) => {
//         connection.release();
//         if (err) {
//           console.error("Error creating UsersPermissions table:", err);
//           return;
//         }
//         console.log("UsersPermissions table created successfully");
//       });
//     });
//   });
// }

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

      console.log("Using database:", process.env.DB);

      const dropUsersPermissionsTableQuery = `
        DROP TABLE IF EXISTS UsersPermissions
      `;
      connection.query(dropUsersPermissionsTableQuery, (err) => {
        if (err) {
          connection.release();
          console.error("Error dropping UsersPermissions table:", err);
          return;
        }

        console.log("Dropped UsersPermissions table if it existed");

        const createUsersPermissionsTableQuery = `
          CREATE TABLE UsersPermissions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            idUser INT NOT NULL,
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
  });
}



//createUsersPermissionsTable();



// function createFilteringTable() {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log("Successfully connected to MySQL");
//     connection.query(`USE ${process.env.DB}`, (err) => {
//       if (err) throw err;

//       const createFilteringTableQuery = `
//         CREATE TABLE IF NOT EXISTS Filtering (
//           userId INT NOT NULL PRIMARY KEY,
//           highPrice DECIMAL(10, 2) NOT NULL,
//           lowPrice DECIMAL(10, 2) NOT NULL,
//           size VARCHAR(50) NOT NULL,
//           city VARCHAR(50) NOT NULL,
//           neighborhood VARCHAR(50) NOT NULL,
//           street VARCHAR(50) NOT NULL,
//           FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
//       )
//       `;
//       connection.query(createFilteringTableQuery, (err) => {
//         connection.release();
//         if (err) throw err;
//         console.log("Filtering table created successfully");
//       });
//     });
//   });
// }

//createFilteringTable();

// function createApartmentsTable() {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log("Successfully connected to MySQL");
//     connection.query(`USE ${process.env.DB}`, (err) => {
//       if (err) throw err;

//       const createApartmentsTableQuery = `
//         CREATE TABLE IF NOT EXISTS Apartments (
//           userId INT NOT NULL,
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           price DECIMAL(10, 2) NOT NULL,
//           size VARCHAR(50) NOT NULL,
//           city VARCHAR(50) NOT NULL,
//           neighborhood VARCHAR(50) NOT NULL,
//           street VARCHAR(50) NOT NULL,
//           FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
//       )
//       `;
//       connection.query(createApartmentsTableQuery, (err) => {
//         connection.release();
//         if (err) throw err;
//         console.log("Apartments table created successfully");
//       });
//     });
//   });
// }


//createApartmentsWaitingTable();

// function createApartmentsWaitingTable() {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log("Successfully connected to MySQL");
//     connection.query(`USE ${process.env.DB}`, (err) => {
//       if (err) throw err;

//       const createApartmentsWaitingTableQuery = `
//         CREATE TABLE IF NOT EXISTS ApartmentsWaiting (
//           userId INT NOT NULL,
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           price DECIMAL(10, 2) NOT NULL,
//           size VARCHAR(50) NOT NULL,
//           city VARCHAR(50) NOT NULL,
//           neighborhood VARCHAR(50) NOT NULL,
//           street VARCHAR(50) NOT NULL,
//           FOREIGN KEY (userId) REFERENCES Users(id) ON DELETE CASCADE
//       )
//       `;
//       connection.query(createApartmentsWaitingTableQuery, (err) => {
//         connection.release();
//         if (err) throw err;
//         console.log("ApartmentsWaiting table created successfully");
//       });
//     });
//   });
// }


//createApartmentsTable();

// function createImagesTable() {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log("Successfully connected to MySQL");
//     connection.query(`USE ${process.env.DB}`, (err) => {
//       if (err) throw err;

//       const createImagesTableQuery = `
//         CREATE TABLE IF NOT EXISTS Images (
//           apartmentId INT NOT NULL,
//           id INT AUTO_INCREMENT PRIMARY KEY,
//           imageLink VARCHAR(255),
//           FOREIGN KEY (apartmentId) REFERENCES Apartments(id) ON DELETE CASCADE
//       )
//       `;
//       connection.query(createImagesTableQuery, (err) => {
//         connection.release();
//         if (err) throw err;
//         console.log("Images table created successfully");
//       });
//     });
//   });
// }


//createImagesTable();

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
        CREATE TABLE IF NOT EXISTS temporaryPasswords (
           id INT AUTO_INCREMENT PRIMARY KEY,
           password VARCHAR(255) NOT NULL
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

function createApartmentTable() {
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

      console.log("Using database:", process.env.DB);

      const dropApartmentTableQuery = `
        DROP TABLE IF EXISTS Apartment
      `;
      connection.query(dropApartmentTableQuery, (err) => {
        if (err) {
          connection.release();
          console.error("Error dropping Apartment table:", err);
          return;
        }

        console.log("Dropped Apartment table if it existed");

        const createApartmentTableQuery = `
          CREATE TABLE Apartment (
            id INT AUTO_INCREMENT PRIMARY KEY,
            idUser INT NOT NULL,
            city VARCHAR(100),
            neighborhood VARCHAR(100),
            street VARCHAR(100),
            size INT,
            price DECIMAL(10, 2),
            numberOfRooms INT,
            description TEXT,
            hasElevator BOOLEAN,
            hasParking BOOLEAN,
            hasBars BOOLEAN,
            hasStorage BOOLEAN,
            hasAirConditioning BOOLEAN,
            hasBalcony BOOLEAN,
            hasMamad BOOLEAN,
            isAccessible BOOLEAN,
            isFurnished BOOLEAN,
            isApproved BOOLEAN,
            FOREIGN KEY (idUser) REFERENCES Users(id) ON DELETE CASCADE
          )
        `;
        connection.query(createApartmentTableQuery, (err) => {
          connection.release();
          if (err) {
            console.error("Error creating Apartment table:", err);
            return;
          }
          console.log("Apartment table created successfully");
        });
      });
    });
  });
}

function addImageLinkField(){
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

      console.log("Using database:", process.env.DB);

      const addImageLinkFieldQuery = `
        ALTER TABLE Apartment
        ADD COLUMN imageLink VARCHAR(255)
      `;

      connection.query(addImageLinkFieldQuery, (err) => {
        connection.release();
        if (err) {
          console.error("Error adding imageLink field to Apartment table:", err);
          return;
        }
        console.log("imageLink field added to Apartment table successfully");
      });
    });
  });
}

addImageLinkField();


//createApartmentTable();

function createTypeApartmentTable() {
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

      const createTypeApartmentTableQuery = `
        CREATE TABLE IF NOT EXISTS TypeApartment (
          id INT AUTO_INCREMENT PRIMARY KEY,
          type VARCHAR(255) NOT NULL
        )
      `;
      connection.query(createTypeApartmentTableQuery, (err) => {
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

//createTypeApartmentTable();

function createTypeCurrentApartmentTable() {
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

      console.log("Using database:", process.env.DB);

      const dropUsersPermissionsTableQuery = `
        DROP TABLE IF EXISTS UsersPermissions
      `;
      connection.query(dropUsersPermissionsTableQuery, (err) => {
        if (err) {
          connection.release();
          console.error("Error dropping UsersPermissions table:", err);
          return;
        }
        console.log("Dropped UsersPermissions table if it existed");
        const createUsersPermissionsTableQuery = `
          CREATE TABLE TypeCurrentApartment (
            id INT AUTO_INCREMENT PRIMARY KEY,
            apartmentId INT NOT NULL,
            typeId INT NOT NULL,
            FOREIGN KEY (apartmentId) REFERENCES Apartment(id) ON DELETE CASCADE,
            FOREIGN KEY (typeId) REFERENCES TypeApartment(id) ON DELETE CASCADE
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
  });
}
//createTypeCurrentApartmentTable();