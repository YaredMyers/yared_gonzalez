const mongoose = require("mongoose");
require("dotenv").config();

const mongoDBMessage = mongoose.createConnection(process.env.MongoDBMessage, {
  useNewUrlParser: true
});
const replicaMessage = mongoose.createConnection(process.env.ReplicaMessage, {
  useNewUrlParser: true
});

let db = {
  mongoDBMessage: {
    isPrimary: true,
    mongo: mongoDBMessage
  },
  replicaMessage: {
    isPrimary: false,
    mongo: replicaMessage
  }
};

let getConnection = function(type) {
  if (type === "primary") {
    return db.mongoDBMessage.isPrimary && db.mongoDBMessage.mongo.readyState === 1
      ? db.mongoDBMessage.mongo
      : db.replicaMessage.mongo;
  } else if (type === "replica") {
    return db.mongoDBMessage.isPrimary && db.replicaMessage.mongo.readyState === 1
      ? db.replicaMessage.mongo
      : db.mongoDBMessage.mongo;
  }
};

let isReplicaOnline = function() {
  if (db.mongoDBMessage.mongo.readyState === 1 && db.replicaMessage.mongo.readyState === 1) {
    return true;
  } else {
    return false;
  }
};

module.exports = { getConnection, isReplicaOnline, db };
