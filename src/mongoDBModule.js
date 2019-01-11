const mongoose = require('mongoose');
require('dotenv').config();

let connectDB = function() {
    setTimeout(function(){
  mongoose
      .connect(process.env.CabiDB, { useNewUrlParser: true })
      .then(x => {
          console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
      })
      .catch(err => {
          console.error('Error connecting to mongo', err)
      });
    }, 10000);
}

module.exports = connectDB;