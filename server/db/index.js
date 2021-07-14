const mysql = require('mysql');

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'quotes_generator'
});

conn.connect();

module.exports = {
  conn: conn
}