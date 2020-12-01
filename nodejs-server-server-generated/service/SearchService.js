'use strict';


/**
 * searching books from elastic
 *
 * q String searching content
 * searchIndex String 
 * searchAction String 
 * returns List
 **/
exports.elasticSearch = function(q,searchIndex,searchAction) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "code" : 0,
  "message" : "message"
}, {
  "code" : 0,
  "message" : "message"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

