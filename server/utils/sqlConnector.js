var mysql = require('promise-mysql');

var LocaldbConfig = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "games",
    port: 3306,
    dateStrings: "date"
};

module.exports = mysql.createPool(LocaldbConfig);