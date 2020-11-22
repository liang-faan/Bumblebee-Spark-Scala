'use strict';

var utils = require('../utils/writer.js');
var Search = require('../service/SearchService');

module.exports.elasticSearch = function elasticSearch (req, res, next, q, searchIndex, searchAction) {
  Search.elasticSearch(q, searchIndex, searchAction)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
