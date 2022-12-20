'use strict';
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://admin:Vy9JeMCBgYBw4TqE@cluster0.x6q3yzc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

/**
 * Create user
 *
 * body User Created user object (optional)
 * returns User
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    client.connect(err => {
      if (err) throw err;
      delete body.id;
      var db = client.db("pwa");
      db.collection("users").insertOne(body, function(err, res) {
        if (err) throw err;
        client.close();
        resolve();
      });
    });
  });
}


/**
 * Get user by user name
 *
 * username String 
 * returns User
 **/
exports.getUserByName = function(username) {
  return new Promise(function(resolve, reject) {
    client.connect(err => {
      if (err) throw err;
      var db = client.db("pwa");
      db.collection("users").find({username: username}, {})
      .toArray(function(err, result) {
        if (err) throw err;
        client.close();
        resolve(result[0]);
      });
    });
  });
}


/**
 * Logs user into the system
 *
 * username String The user name for login
 * password String The password for login in clear text
 * returns String
 **/
exports.loginUser = function(username, password) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Logs out current logged in user session
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * uploads an image
 *
 * body Object  (optional)
 * additionalMetadata String Additional Metadata (optional)
 * userId Long ID of user
 * returns ApiResponse
 **/
exports.uploadFile = function(body,additionalMetadata,userId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "code" : 0,
  "message" : "message"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

