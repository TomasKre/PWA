'use strict';

const jwt = require("jsonwebtoken");
var utils = require('../utils/writer.js');
var User = require('../service/UserService');

exports.createUser = function createUser (req, res, next) {
  User.createUser(req.body.username, req.body.password, req.body.email, req.body.firstName, req.body.lastName)
    .then(function (response) {
      var responseObject = {code: response, message: "User signed up"}
      utils.writeJson(res, responseObject);
    })
    .catch(function (response) {
      var responseObject = {code: response, message: "Error when signing up"}
      utils.writeJson(res, responseObject);
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

      const token = jwt.sign({ username: req.body.username }, "PWA_very_secure11", { // secret
        expiresIn: 86400, // 24 hours
      });

      req.session.token = token;

      var responseObject = {token: token}

      utils.writeJson(res, responseObject);
    })
    .catch(function (response) {
      if (response == 500) {
        var responseObject = {code: response, message: "Error logging in"}
      } else if (response == 404) {
        var responseObject = {code: response, message: "User doesn't exist"}
      } else if (response == 401) {
        var responseObject = {code: response, message: "Wrong password"}
      }
      utils.writeJson(res, responseObject);
    });
};

exports.logoutUser = function logoutUser (req, res, next) {
  User.logoutUser(req.body.username)
    .then(function (response) {
      req.session = null;
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.uploadFile = function uploadFile (req, res, next) {
  User.uploadFile(req.body.username, req.body.img)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};