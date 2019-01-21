const mongoose = require("mongoose");
require("dotenv").config();

const conn = mongoose.createConnection(process.env.CabiDB, {
  useNewUrlParser: true
});
const conn2 = mongoose.createConnection(process.env.CabiDB2, {
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

let getConnection = function(type){
  console.log(type)
  if(type === "primary"){
       return db.conn.isPrimary && db.conn.mongo.readyState === 1 ?
        db.conn.mongo : db.conn2.mongo
  } else if(type === "replica"){
       return !db.conn2.isPrimary && db.conn2.mongo.readyState === 1 ? 
       db.conn2.mongo : console.log("entra en conecc")
  } 
}

let isReplicaOnline = function(){
  if(db.conn.mongo.readyState === 1 && db.conn2.mongo.readyState === 1){
    return true;
} else {
    return false;
}
}

module.exports = {getConnection, isReplicaOnline, db};
