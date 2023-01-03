'use strict';

var utils = require('../utils/writer.js');
var User = require('../service/UserService');

exports.createUser = function createUser (req, res, next) {
  User.createUser(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.getUserByName = function getUserByName (req, res, next) {
  User.getUserByName(req.params.name)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.loginUser = function loginUser (req, res, next) {
  User.loginUser(req.body.username, req.body.password)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.logoutUser = function logoutUser (req, res, next) {
  User.logoutUser()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.uploadFile = function uploadFile (req, res, next) {
  User.uploadFile(req.body, additionalMetadata, userId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
