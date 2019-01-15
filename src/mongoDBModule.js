const mongoose = require('mongoose');
require('dotenv').config();
const myCabiDB = process.env.CabiDB;

let connectDB = function(param) {
    setTimeout(function(){
  mongoose
      .createConnection(myCabiDB, { useNewUrlParser: true })
      .then(x => {
          console.log(`Connected to Mongo! Database name: "${x.name}" "${param}"`)
        //   console.log(x)
      })
      .catch(err => {
          console.error('Error connecting to mongo', err)
      });
    }, 10000);
}

module.exports = connectDB;