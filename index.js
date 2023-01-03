const express = require('express');
const cors = require('cors');
const app = express();

var serverPort = (process.env.PORT || 5000);

const userController = require('./controllers/user');
const groupController = require('./controllers/group');
const messageController = require('./controllers/message');

app.use(cors());

app.use(express.json());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

// User routes
app.get('/user/login', userController.loginUser);
app.get('/user/logout', userController.logoutUser);
app.get('/user/:name', userController.getUserByName);
app.post('/user', userController.createUser);

// Group routes
app.get('/group', groupController.getGroup);
app.get('/group/:userId', groupController.getAllGroups);
app.post('/group', groupController.postGroup);

// Message routes
app.get('/messages/:groupId', messageController.getMessages);
app.post('/messages', messageController.postMessage);

app.listen(serverPort, function() {
  console.log('Express server listening on port ' + serverPort);
});