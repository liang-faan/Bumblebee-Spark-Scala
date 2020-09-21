const sqlite3 = require('sqlite3').verbose();
const config = require('../Config');
var path = require('path');
// const query = require('../Query');

let db = new sqlite3.Database(resolveHome(config.db.path),sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }else{
        console.log('Connected to the airflow database.');
    }
    
});


function resolveHome(filepath) {
    if (filepath[0] === '~') {
        return path.join(process.env.HOME, filepath.slice(1));
    }
    return filepath;
}

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

