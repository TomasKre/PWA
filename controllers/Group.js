'use strict';

var utils = require('../utils/writer.js');
var Group = require('../service/GroupService');

exports.getGroup = function getGroup (req, res, next) {
  Group.getGroup(req.query.username, req.query.name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      if (response == 500) {
        var responseObject = {code: response, message: "Error connecting to db"}
      } else if (response == 400) {
        var responseObject = {code: response, message: "Error getting group"}
      }
      utils.writeJson(res, responseObject);
    });
};

exports.getAllGroups = function getGroup (req, res, next) {
  Group.getAllGroups(req.params.username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      if (response == 500) {
        var responseObject = {code: response, message: "Error connecting to db"}
      } else if (response == 400) {
        var responseObject = {code: response, message: "Error getting groups"}
      }
      utils.writeJson(res, responseObject);
    });
};

exports.postGroup = function postGroup (req, res, next) {
  Group.postGroup(req.body.username, req.body.name)
    .then(function (response) {
      var responseObject = {code: response, message: "Group created"}
      utils.writeJson(res, responseObject);
    })
    .catch(function (response) {
      if (response == 500) {
        var responseObject = {code: response, message: "Error connecting to db"}
      } else if (response == 400) {
        var responseObject = {code: response, message: "Error creating group"}
      }
      utils.writeJson(res, responseObject);
    });
};

exports.addUserToGroup = function postGroup (req, res, next) {
  Group.postGroup(req.body.groupId, req.body.username)
    .then(function (response) {
      var responseObject = {code: response, message: "User added"}
      utils.writeJson(res, responseObject);
    })
    .catch(function (response) {
      if (response == 500) {
        var responseObject = {code: response, message: "Error connecting to db"}
      } else if (response == 400) {
        var responseObject = {code: response, message: "Error adding user to group"}
      }
      utils.writeJson(res, responseObject);
    });
};