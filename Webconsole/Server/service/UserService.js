'use strict';

var database = require('../db/Database')
var query = require('../Query');

var connection = database.getDatabaseConnection();

/**
 * User Register
 *
 * body User Input user information
 * no response value expected for this operation
 **/
exports.createUser = function (body) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Retrieve user by name
 *
 * userName String Retrieve user informaton based on user name
 * returns User
 **/
exports.getUser = function (userName) {
  return new Promise(function (resolve, reject) {
    // var responseObj;
    connection.get(query.retrieve_user_by_name, userName, userName, (err, row) => {
      if (err || !row) {
        // console.error(err.message);
        var responseObj = {
          "code": "404",
          "message": `Cannot find user ${userName}`
        };
        reject(responseObj);
      } else {
        // responseObj = JSON.stringify(row);
        // responseObj=row;
        // console.log(responseObj);
        resolve(row);
      }

    });
  });
}

/**
 * Retrieve user roles by userName
 *
 * userName String 
 * returns List
 **/
exports.getUserRoles = function(userName) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "mappingId" : 5,
  "roles" : [ {
    "permissions" : [ {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    }, {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    } ],
    "name" : "name",
    "id" : 7
  }, {
    "permissions" : [ {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    }, {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    } ],
    "name" : "name",
    "id" : 7
  } ],
  "userName" : "userName",
  "userId" : 2
}, {
  "mappingId" : 5,
  "roles" : [ {
    "permissions" : [ {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    }, {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    } ],
    "name" : "name",
    "id" : 7
  }, {
    "permissions" : [ {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    }, {
      "name" : "name",
      "id" : 9,
      "views" : [ {
        "viewName" : "viewName",
        "id" : 3
      }, {
        "viewName" : "viewName",
        "id" : 3
      } ]
    } ],
    "name" : "name",
    "id" : 7
  } ],
  "userName" : "userName",
  "userId" : 2
} ];
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
exports.listUsers = function () {
  return new Promise(function (resolve, reject) {

    connection.all(query.retrieve_all_users, (err, rows) => {
      if (err || !rows) {
        // console.error(err.message);
        var responseObj = {
          "code": "404",
          "message": err
        };
        reject(responseObj);
      } else {
        // responseObj = JSON.stringify(row);
        // responseObj=row;
        // console.log(responseObj);
        resolve(rows);
      }

    });

    // var examples = {};
    // examples['application/json'] = [{
    //   "firstName": "firstName",
    //   "lastName": "lastName",
    //   "password": "password",
    //   "failLoginCount": 5,
    //   "active": 6,
    //   "id": 0,
    //   "createdOn": "2000-01-23T04:56:07.000+00:00",
    //   "loginCount": 1
    // }, {
    //   "firstName": "firstName",
    //   "lastName": "lastName",
    //   "password": "password",
    //   "failLoginCount": 5,
    //   "active": 6,
    //   "id": 0,
    //   "createdOn": "2000-01-23T04:56:07.000+00:00",
    //   "loginCount": 1
    // }];
    // if (Object.keys(examples).length > 0) {
    //   resolve(examples[Object.keys(examples)[0]]);
    // } else {
    //   resolve();
    // }
  });
}

