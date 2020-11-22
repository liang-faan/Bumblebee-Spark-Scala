'use strict';

var utils = require('../utils/writer.js');
var Task = require('../service/TaskService');

module.exports.getTaskSchedule = function getTaskSchedule (req, res, next) {
  Task.getTaskSchedule()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTasks = function getTasks (req, res, next) {
  Task.getTasks()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
