const mysql = require('mysql2');
const config = require('../config')

const pool = mysql.createPool({
  host: 'localhost', 
  user: 'root',
  database: 'node-complete',
  password: config.password
});

module.exports = pool.promise();