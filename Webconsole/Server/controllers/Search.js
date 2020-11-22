'use strict';

var utils = require('../utils/writer.js');
var Search = require('../service/SearchService');

module.exports.elasticSearch = function elasticSearch (req, res, next, q) {
  Search.elasticSearch(q)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
