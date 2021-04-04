const mysql = require('mysql');

// mysql configure
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) console.log('DB connection failed!');
  else console.log('DB connection successful!');
});

const supplierTable = `CREATE TABLE IF NOT EXISTS supplier(supplierId INT PRIMARY KEY auto_increment, userId INT NOT NULL, productId INT NOT NULL, quantity DECIMAL(10,2) NOT NULL, totalPayable DECIMAL(10,2) NOT NULL, paid DECIMAL(10,2) NOT NULL, due DECIMAL(10,2) NOT NULL, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (userId) REFERENCES user(userId) ON UPDATE CASCADE ON DELETE CASCADE, FOREIGN KEY (productId) REFERENCES product(productId) ON UPDATE CASCADE ON DELETE CASCADE) ENGINE=INNODB;`;

const productTable = `CREATE TABLE IF NOT EXISTS product(productId INT PRIMARY KEY auto_increment, productCode VARCHAR(20) NOT NULL, productName VARCHAR(255) NOT NULL, retailerPrice DECIMAL(10,2), sellingPrice DECIMAL(10,2) NOT NULL, countInStock INT NOT NULL, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP) ENGINE=INNODB;`;

const userTable = `CREATE TABLE IF NOT EXISTS user(userId INT PRIMARY KEY auto_increment, name VARCHAR(50) NOT NULL, phone VARCHAR(20) NOT NULL UNIQUE, address VARCHAR(50) NOT NULL, userType ENUM('customer','supplier') NOT NULL, createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP) ENGINE=INNODB;`;

const customerTable = `CREATE TABLE IF NOT EXISTS customer(customerId INT PRIMARY KEY auto_increment, userId INT NOT NULL, productId INT NOT NULL, quantity INT NOT NULL, discount DECIMAL(10,2), totalPayable DECIMAL(10,2) NOT NULL, paid DECIMAL(10,2) NOT NULL, due DECIMAL(10,2) NOT NULL, profit DECIMAL(10,2), createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP, FOREIGN KEY (userId) REFERENCES user(userId) ON UPDATE CASCADE ON DELETE CASCADE, FOREIGN KEY (productId) REFERENCES product(productId) ON UPDATE CASCADE ON DELETE CASCADE) ENGINE=INNODB;`;

const adminTable = `CREATE TABLE IF NOT EXISTS admin(phone VARCHAR(20) UNIQUE PRIMARY KEY, password VARCHAR(255) NOT NULL, photo VARCHAR(255) NOT NULL) ENGINE=INNODB;`;

// Execute query
db.query(userTable);
db.query(productTable);
db.query(supplierTable);
db.query(customerTable);
db.query(adminTable);

module.exports = db;
