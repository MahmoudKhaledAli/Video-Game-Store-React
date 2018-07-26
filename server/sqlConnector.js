/**
 * Created by Ahmkel on 12/5/2015.
 */

//Create the connection
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