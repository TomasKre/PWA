'use strict';

var utils = require('../utils/writer.js');
var Group = require('../service/GroupService');

exports.getGroup = function getGroup (req, res, next) {
  Group.getGroup(req.query.username, req.query.name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.getAllGroups = function getGroup (req, res, next) {
  Group.getAllGroups(req.params.username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.postGroup = function postGroup (req, res, next) {
  Group.postGroup(req.body.username, req.body.name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.addUserToGroup = function postGroup (req, res, next) {
  Group.postGroup(req.body.groupId, req.body.username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};