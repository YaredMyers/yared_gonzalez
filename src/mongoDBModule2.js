const mongoose = require("mongoose");
require("dotenv").config();
//prueba

// var conn      = mongoose.createConnection(process.env.CabiDB, { useNewUrlParser: true });
// var conn2     = mongoose.createConnection(process.env.CabiDB2, { useNewUrlParser: true });

// module.exports = function(param) {
//     setTimeout(function(){
//   mongoose
//       .createConnection(param, { useNewUrlParser: true })
//       .then(x => {
//           console.log(`Connected to Mongo! Database name: "${x.name}"`)
//       })
//       .catch(err => {
//           console.error('Error connecting to mongo', err)
//       });
//     }, 10000);
// }

// var CabiRepCredit = conn2.model("CabiGlobalCredit", CabiGlobalCredit)

// // stored in 'testA' database
// var myCabiDB    = conn.model('Model', new mongoose.Schema({
//   title : { type : String, default : 'model in cabiDB database' }
// }));

// // stored in 'testB' database
// var myCabiDB2    = conn2.model('Model', new mongoose.Schema({
//   title : { type : String, default : 'model in cabiDBReplica database' }
// }));

// module.exports = {conn,conn2};

// require('dotenv').config();
// const mongoose = require('mongoose');
const conn = mongoose.createConnection(process.env.CabiDB, {
  useNewUrlParser: true
});
const conn2 = mongoose.createConnection(process.env.CabiDB2, {
  useNewUrlParser: true
});

let db = {
  conn: {
    isPrimary: true,
    conn: conn
  },
  conn2: {
    isPrimary: false,
    conn: conn2
  }
};

// function getConnection(type) {
//   if (type === "isPrimary") {
//     return conn.isPrimary && mongoose.connection.readyState === 1 ? conn.conn : conn2.conn; 
//   } else if (type === "replica") {
//     return conn.isPrimary && mongoose.connection.readyState === 1? conn2.conn : conn.conn; 
//   }
// }

let getConnection = function(type){
  if(type === "primary"){
       // si conn es true, conecta a la database1 y haz el modelo con ella
       return db.conn.isPrimary && db.conn.conn.readyState === 1 ?
        db.conn.conn : db.conn2.conn
        console.log(readyState)
  } else if (type === "replica") {
       // si conn2 es true, conecta a la database2 y haz el modelo con ella
       return db.conn2.isPrimary && mongoose.connection.readyState === 1 ? 
       db.conn.conn : db.conn2.conn
  }
}

// let validateDB = function(){
//   if (db.conn === true){
//     return conn;
//   } else {
//     return conn2;
//   }
// }



// let mongoConnect = function (param) {
//   const clear = setInterval(() => {
//      mongoose.Promise = Promise;
//      mongoose
//        .createConnection(param, {
//           useNewUrlParser: true

//        })
//        .then(x => {
//           console.log(`Connected to Mongo! Database name: "${x.name}"`)
//           clearInterval(clear)
//        })
//        .catch(err => {
//           console.error('Error connecting to mongo', err)
//        });
//   }, 4000)
// }
module.exports = {getConnection};
