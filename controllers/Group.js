'use strict';

var utils = require('../utils/writer.js');
var Group = require('../service/GroupService');

module.exports.getGroup = function getGroup (req, res, next, userId, name) {
  Group.getGroup(userId, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAllGroups = function getGroup (req, res, next, userId) {
  Group.getAllGroups(userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postGroup = function postGroup (req, res, next, userId, name) {
  Group.postGroup(userId, name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
