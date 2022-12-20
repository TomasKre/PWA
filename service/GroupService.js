'use strict';
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://admin:Vy9JeMCBgYBw4TqE@cluster0.x6q3yzc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


/**
 * Get all groups for user
 *
 * userId String ID of user
 * returns array of Groups
 **/
exports.getAllGroups = function(userId) {
  return new Promise(function(resolve, reject) {
    client.connect(err => {
      if (err) throw err;
      var userIdObj = new ObjectId(userId) 
      var db = client.db("pwa");
      db.collection("groups").find({user_id: userIdObj}, {})
      .toArray(function(err, result) {
        if (err) throw err;
        client.close();
        resolve(result);
      });
    });
  });
}


/**
 * Get group
 *
 * userId String ID of user
 * name String ID of requested group
 * returns String
 **/
exports.getGroup = function(userId, name) {
  return new Promise(function(resolve, reject) {
    client.connect(err => {
      if (err) throw err;
      var userIdObj = new ObjectId(userId) 
      var db = client.db("pwa");
      db.collection("groups").find({user_id: userIdObj, name: name}, {})
      .toArray(function(err, result) {
        if (err) throw err;
        client.close();
        resolve(result[0]);
      });
    });
  });
}


/**
 * Start group
 *
 * userId String ID of user
 * name String Name of requested group
 * returns String
 **/
exports.postGroup = function(userId, name) {
  return new Promise(function(resolve, reject) {
    client.connect(err => {
      if (err) throw err;
      userId = new ObjectId(userId) 
      var db = client.db("pwa");
      var body = { user_id: userId, name: name };
      db.collection("groups").insertOne(body, function(err, res) {
        if (err) throw err;
        client.close();
        resolve();
      });
    });
  });
}

