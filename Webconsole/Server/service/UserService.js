'use strict';

var database = require('../db/Database')
var query = require('../Query');

/**
 * User Register
 *
 * body User Input user information
 * no response value expected for this operation
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Retrieve user by name
 *
 * userName String Retrieve user informaton based on user name
 * returns User
 **/
exports.getUser = function(userName) {

  var connection = database.getDatabaseConnection();
  connection.get(query.retrieve_all_users, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.first_name);
    console.log(JSON.stringify(row));
  })

  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "password" : "password",
  "failLoginCount" : 5,
  "active" : 6,
  "id" : 0,
  "createdOn" : "2000-01-23T04:56:07.000+00:00",
  "loginCount" : 1
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * List all pets
 *
 * returns Users
 **/
exports.listUsers = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "password" : "password",
  "failLoginCount" : 5,
  "active" : 6,
  "id" : 0,
  "createdOn" : "2000-01-23T04:56:07.000+00:00",
  "loginCount" : 1
}, {
  "firstName" : "firstName",
  "lastName" : "lastName",
  "password" : "password",
  "failLoginCount" : 5,
  "active" : 6,
  "id" : 0,
  "createdOn" : "2000-01-23T04:56:07.000+00:00",
  "loginCount" : 1
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

