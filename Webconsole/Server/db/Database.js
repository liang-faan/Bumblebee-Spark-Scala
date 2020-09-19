const sqlite3 = require('sqlite3').verbose();
const config = require('../Config');
var path = require('path');
// const query = require('../Query');

let db = new sqlite3.Database(config.db.path,sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the chinook database.');
});




exports.getDatabaseConnection = function () {
    return db;
}

exports.closeDatabaseConnection = function (datbase) {
    datbase.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Close the database connection.');
    });
}

