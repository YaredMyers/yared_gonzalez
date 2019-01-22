const mongoose = require("mongoose");
require("dotenv").config();

const conn = mongoose.createConnection(process.env.MongoDBMessage, {
  useNewUrlParser: true
});
const conn2 = mongoose.createConnection(process.env.ReplicaMessage, {
  useNewUrlParser: true
});

let db = {
  conn: {
    isPrimary: true,
    mongo: conn
  },
  conn2: {
    isPrimary: false,
    mongo: conn2
  }
};

let getConnection = function(type) {
  if (type === "primary") {
    return db.conn.isPrimary && db.conn.mongo.readyState === 1
      ? db.conn.mongo
      : db.conn2.mongo;
  } else if (type === "replica") {
    return db.conn.isPrimary && db.conn2.mongo.readyState === 1
      ? db.conn2.mongo
      : db.conn.mongo;
  }
};

let isReplicaOnline = function() {
  if (db.conn.mongo.readyState === 1 && db.conn2.mongo.readyState === 1) {
    return true;
  } else {
    return false;
  }
};

module.exports = { getConnection, isReplicaOnline, db };
