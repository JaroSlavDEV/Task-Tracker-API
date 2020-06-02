const mysql = require('mysql');
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = require('../const');

const configDB = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
};

class Database {
  constructor(firstTime) {
    if (Database.exists) {
      return Database.instance
    }

    Database.exists = true
    Database.instance = this

    const { database, ...configRest } = configDB;
    this.connection = mysql.createConnection(firstTime ? configRest : configDB);

    this.connection.connect((err) => {
      if (err) {
        throw err;
      }
      console.log('MySQL Connected...');
    });
  }

  getConnection() {
    return this.connection
  }

  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}

module.exports = Database;
