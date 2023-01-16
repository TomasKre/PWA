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
      if (err) {
        console.error(err);
        reject(500);
      }
      var groupIdObj = new ObjectId(groupId) 
      var db = client.db("pwa");
      db.collection("messages").find({group_id: groupIdObj}, {}).sort({ datetime: 1 })
      .toArray(function(err, result) {
        client.close();
        if (err) {
          console.error(err);
          reject(404);
        }
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
exports.postMessage = function(message) {
  return new Promise(function(resolve, reject) {
    client.connect(err => {
      if (err) {
        console.error(err);
        reject(500);
      }
      message.group_id = new ObjectId(message.group_id)
      var db = client.db("pwa");
      db.collection("messages").insertOne(message, function(err, res) {
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

