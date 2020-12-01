'use strict';

var utils = require('../utils/writer.js');
var Dag = require('../service/DagService');

module.exports.getDags = function getDags (req, res, next) {
  Dag.getDags()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
