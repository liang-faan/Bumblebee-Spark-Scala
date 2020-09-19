'use strict';


/**
 * User Authentication
 *
 * body Login Input user authentication
 * returns UserAccess
 **/
exports.userLogin = function (body) {
  console.log(JSON.stringify(body))
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "accesssToken": "accesssToken",
      "refreshToken": "refreshToken"
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

