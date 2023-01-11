const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const cookieSession = require("cookie-session");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const { authJwt } = require("../middleware");

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id} said ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

var serverPort = (process.env.PORT || 5000);

const userController = require('./controllers/User');
const groupController = require('./controllers/Group');
const messageController = require('./controllers/Message');

app.use(cors());

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
app.get('/group', [authJwt.verifyToken], groupController.getGroup);
app.get('/group/:username', [authJwt.verifyToken], groupController.getAllGroups);
app.post('/group', [authJwt.verifyToken], groupController.postGroup);

// Message routes
app.get('/message/:groupId', [authJwt.verifyToken], messageController.getMessages);
app.post('/message', [authJwt.verifyToken], messageController.postMessage);

server.listen(serverPort, function() {
  console.log('Express server listening on port ' + serverPort);
});