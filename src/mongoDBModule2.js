const mongoose = require('mongoose');
require('dotenv').config();
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

// let db = {
//   conn: {
//     leader: true
//   },
//   conn2: {
//     leader: false
//   }
// }

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
})
const conn2 = mongoose.createConnection(process.env.CabiDB2, {
   useNewUrlParser: true  
});
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
module.exports = {conn, conn2};