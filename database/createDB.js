const Database = require('./DB');
const {
  DB_NAME
} = require('../const');

const db = new Database(true);
const sqlDB = `CREATE DATABASE ${DB_NAME}`;
const sqlDBSelect = `USE ${DB_NAME}`;
const sqlDBMode = `SET sql_mode = 'STRICT_ALL_TABLES'`;

const sqlTBUsers = `CREATE TABLE users(
  user_id int AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  PRIMARY KEY(user_id))`;

const sqlTBTasks = `CREATE TABLE tasks(
  id int AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  status ENUM('View', 'In Progress', 'Done') NOT NULL,
  user_id int NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(user_id) REFERENCES users(user_id))`;

(async () => {
  try {
    await db.query(sqlDB);
    console.log('Database created...');

    await db.query(sqlDBSelect);
    console.log('Database selected...');

    await db.query(sqlDBMode);
    console.log('Database strict mode selected...');

    await db.query(sqlTBUsers);
    console.log('Table "Users" created...');

    await db.query(sqlTBTasks);
    console.log('Table "Tasks" created...');

    await db.close();

  } catch (e) {
    await db.close();
    console.log(e);
  }
})();
