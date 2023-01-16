'use strict';

exports.socket = function getMessages (req, res, next) {
    const express = require('express');
    const app = express();
    const http = require('http');
    const { Server } = require("socket.io");
    const server = http.createServer(app);
    
    const io = new Server(server, {cors: {origin: "*"}});
    io.on('connection', (socket) => {
      console.log('User connected');
    
      socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
      });
    
      socket.on('message', (message) => {
        console.log(message);
        messageController.postMessageIO(message);
        io.emit('message', message);
      });
    
      socket.on('disconnect', (reason) => {
        console.log('User disconnected!');
      });
    });
    
};