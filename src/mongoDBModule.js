// const mongoose = require('mongoose');
// require('dotenv').config();
// const myCabiDB = process.env.CabiDB;


// let connectDB = function(param) {
//     setTimeout(function(){
//   mongoose
//       .createConnection(myCabiDB, { useNewUrlParser: true })
//       .then(x => {
//           console.log(`Connected to Mongo! Database name: "${x.name}" "${param}"`)
//         //   console.log(x)
//       })
//       .catch(err => {
//           console.error('Error connecting to mongo', err)
//       });
//     }, 10000);
// }

// // let connectDB2 = function(param) {
// //     setTimeout(function(){
// //   mongoose
// //       .createConnection(myCabiDB2, { useNewUrlParser: true })
// //       .then(x => {
// //           console.log(`Connected to Mongo! Database name: "${x.name}" "${param}"`)
// //       })
// //       .catch(err => {
// //           console.error('Error connecting to mongo', err)
// //       });
// //     }, 15000);
// // }


// // .createConnection(myCabiDB, { useNewUrlParser: true })


// // module.exports = connectDB2;
// module.exports = connectDB;