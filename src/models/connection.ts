import mysql from 'mysql2/promise';
import 'dotenv/config';

const isDev = process.env.NODE_ENV === 'development';

async function getConnection() {
  const connection = mysql.createPool({
    host: isDev ? 'localhost' : process.env.HOSTNAME,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: 3306,
  });

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS Users (
      id INTEGER PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255),
      age INTEGER
    );`);

  return connection;
}

export default getConnection;
