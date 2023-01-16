'use strict';

var utils = require('../utils/writer.js');
var Message = require('../service/MessageService');

exports.getMessages = function getMessages (req, res, next) {
  Message.getMessages(req.params.groupId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.postMessage = function postMessage (req, res, next) {
  Message.postMessage(req.body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

exports.postMessageIO = function postMessage (messageBody) {
  Message.postMessage(messageBody)
    .then(function (response) {
      return response;
    })
    .catch(function (response) {
      return response;
    });
};