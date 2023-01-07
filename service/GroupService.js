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
exports.getAllGroups = function(username) {
  return new Promise(function(resolve, reject) {
    client.connect(err => {
      if (err) throw err;
      var db = client.db("pwa");
      console.log(username);
      db.collection("groups").find({ usernames: username }, {})
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
exports.getGroup = function(username, name) {
  return new Promise(function(resolve, reject) {
    client.connect(err => {
      if (err) throw err;
      var db = client.db("pwa");
      db.collection("groups").find({ usernames: username, name: name }, {})
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
exports.postGroup = function(username, name) {
  return new Promise(function(resolve, reject) {
    client.connect(err => {
      if (err) throw err;
      var db = client.db("pwa");
      var body = { usernames: username, name: name };
      db.collection("groups").insertOne(body, function(err, res) {
        if (err) throw err;
        client.close();
        resolve();
      });
    });
  });
}

