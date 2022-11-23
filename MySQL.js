var mysql = require('mysql2');
var config = require('./config.json');

var pool = mysql.createPool(config.database_connection);

module.exports.pool = pool;