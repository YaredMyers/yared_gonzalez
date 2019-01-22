const mongoose = require("mongoose");
require("dotenv").config();

const mongoDBCredit = mongoose.createConnection(process.env.MongoDBCredit, {
  useNewUrlParser: true
});
const replicaCredit = mongoose.createConnection(process.env.ReplicaCredit, {
  useNewUrlParser: true
});

let db = {
  mongoDBCredit: {
    isPrimary: true,
    mongo: mongoDBCredit
  },
  replicaCredit: {
    isPrimary: false,
    mongo: replicaCredit
  }
};

let getConnection = function(type) {
  if (type === "primary") {
    return db.mongoDBCredit.isPrimary && db.mongoDBCredit.mongo.readyState === 1
      ? db.mongoDBCredit.mongo
      : db.replicaCredit.mongo;
  } else if (type === "replica") {
    return db.mongoDBCredit.isPrimary && db.replicaCredit.mongo.readyState === 1
      ? db.replicaCredit.mongo
      : db.mongoDBCredit.mongo;
  }
};

let isReplicaOnline = function() {
  if (db.mongoDBCredit.mongo.readyState === 1 && db.replicaCredit.mongo.readyState === 1) {
    return true;
  } else {
    return false;
  }
};

module.exports = { getConnection, isReplicaOnline, db };
