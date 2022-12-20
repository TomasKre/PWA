'use strict';

var utils = require('../utils/writer.js');
var Message = require('../service/MessageService');

module.exports.getMessages = function getMessages (req, res, next, groupId) {
  Message.getMessages(groupId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.postMessage = function postMessage (req, res, next, body) {
  Message.postMessage(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
