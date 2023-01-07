'use strict';
const bcrypt = require('bcryptjs');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://admin:Vy9JeMCBgYBw4TqE@cluster0.x6q3yzc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

/**
 * Create user
 *
 * body User Created user object (optional)
 * returns User
 **/
exports.createUser = function(username, password, email, firstName, lastName) {
  return new Promise(function(resolve, reject) {
    client.connect(err => {
      if (err) throw err;
      console.log(password);
      const hashedPassword = bcrypt.hashSync(password);
      console.log(hashedPassword);
      var db = client.db("pwa");
      db.collection("users").insertOne({ username, firstName, lastName, email, password: hashedPassword }, (err, result) => {
        client.close();
        if (err) {
          console.error(err);
          reject(400);
        }
        resolve(200);
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
      db.collection("users").findOne({username: username}, {})
      .toArray(function(err, result) {
        if (err) throw err;
        client.close();
        resolve(result);
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
    client.connect(err => {
      if (err) throw err;
      var db = client.db("pwa");
      db.collection("users").findOne({ username }, (err, user) => {
        client.close();
        if (err) {
          console.error(err);
          reject(500);
        }
        if (!user) {
          reject(404);
        }
        if (!bcrypt.compareSync(password, user.password)) {
          reject(401);
        }
        resolve(200);
      });
    });
  });
}


/**
 * Logs out current logged in user session
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, reject) {
    resolve(200);
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
    resolve(200);
  });
}