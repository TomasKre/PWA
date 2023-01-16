const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const cookieSession = require("cookie-session");
const authJWT = require("./middleware/authJWT.js");

var serverPort = (process.env.PORT || 5000);

const userController = require('./controllers/User');
const groupController = require('./controllers/Group');
const messageController = require('./controllers/Message');


app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    secret: "PWA_very_secure11", // secret password etc.
    httpOnly: true
  })
);

app.get('/', function(req, res) {
  res.send(serverPort);
});

// User routes
app.post('/user/login', userController.loginUser);
app.get('/user/logout', userController.logoutUser);
app.get('/user/:name', userController.getUserByName);
app.post('/user/signup', userController.createUser);

// Group routes
app.get('/group', [authJWT.verifyToken], groupController.getGroup);
app.get('/group/:username', [authJWT.verifyToken], groupController.getAllGroups);
app.post('/group', [authJWT.verifyToken], groupController.postGroup);
app.post('/group/addUser', [authJWT.verifyToken], groupController.addUserToGroup);

// Message routes
app.get('/message/:groupId', [authJWT.verifyToken], messageController.getMessages);
app.post('/message', [authJWT.verifyToken], messageController.postMessage);

/*const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Max-Age', 60*60*24*30);
  });*/

const server = http.createServer(app);

const io = require("socket.io")(server);
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('message', (message) => {
    console.log(message);
    messageController.postMessageIO(message);
    io.emit('message', message);
  });

  socket.on('disconnect', (reason) => {
    console.log('User disconnected!');
  });
});

server.listen(serverPort, function() {
  console.log('Express server listening on port ' + serverPort);
});
