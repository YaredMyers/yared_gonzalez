const mongoose = require('mongoose');
require('dotenv').config();
const myCabiDB = process.env.CabiDB;

let connectDB = function() {
    setTimeout(function(){
  mongoose
      .connect(myCabiDB, { useNewUrlParser: true })
      .then(x => {
          console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
      })
      .catch(err => {
          console.error('Error connecting to mongo', err)
      });
    }, 10000);
}

module.exports = connectDB;