'use strict';

var utils = require('../utils/writer.js');
var Notification = require('../service/NotificationService');

module.exports.publishNotifications = function publishNotifications (req, res, next, body) {
  Notification.publishNotifications(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.retrieveNotifications = function retrieveNotifications (req, res, next, appId) {
  Notification.retrieveNotifications(appId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
