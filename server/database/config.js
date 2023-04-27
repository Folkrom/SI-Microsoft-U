import mysql from 'mysql2';

const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_USER,
    database: process.env.DB_NAME
  });

export default dbConnection;
