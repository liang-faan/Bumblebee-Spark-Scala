'use strict';

var utils = require('../utils/writer.js');
var Job = require('../service/JobService');

module.exports.getJobs = function getJobs (req, res, next) {
  Job.getJobs()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
