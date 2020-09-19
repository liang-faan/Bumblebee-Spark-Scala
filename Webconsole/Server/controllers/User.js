'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');
var database = require('../db/Database')
var query = require('../Query');

module.exports.createUser = function createUser(req, res, next, body) {
  User.createUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUser = function getUser(req, res, next, userName) {
  var connection = database.getDatabaseConnection();
  connection.get(query.retrieve_all_users, (err, row) => {
    if (err) {
      console.error(err.message);
    }
    console.log(row.id + "\t" + row.first_name);
    console.log(JSON.stringify(row));
  })
  User.getUser(userName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.listUsers = function listUsers(req, res, next) {
  User.listUsers()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
