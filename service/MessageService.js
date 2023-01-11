'use strict';
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://admin:Vy9JeMCBgYBw4TqE@cluster0.x6q3yzc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


/**
 * Get messages
 *
 * groupId String ID of group conversation from where to get messages
 * returns List
 **/
exports.getMessages = function(groupId) {
  return new Promise(function(resolve, reject) {
    client.connect(err => {
      if (err) throw err;
      var groupIdObj = new ObjectId(groupId) 
      var db = client.db("pwa");
      db.collection("messages").find({group_id: groupIdObj}, {}).sort({ datetime: 1 })
      .toArray(function(err, result) {
        if (err) reject(404); // test
        client.close();
        resolve(result);
      });
    });
  });
}


/**
 * Post message to conversation
 *
 * body Message Send message
 * groupId String ID of conversation
 * returns String
 **/
exports.postMessage = function(body) {
  return new Promise(function(resolve, reject) {
    client.connect(err => {
      if (err) throw err;
      body.group_id = new ObjectId(body.group_id)
      body.from_id = new ObjectId(body.from_id)
      var db = client.db("pwa");
      db.collection("messages").insertOne(body, function(err, res) {
        if (err) throw err;
        client.close();
        resolve();
      });
    });
  });
}

