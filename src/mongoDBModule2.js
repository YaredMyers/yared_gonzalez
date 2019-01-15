const mongoose = require('mongoose');
require('dotenv').config();
const myCabiDB2 = process.env.CabiDB2;

let connectDB2 = function(param) {
    setTimeout(function(){
  mongoose
      .createConnection(myCabiDB2, { useNewUrlParser: true })
      .then(x => {
          console.log(`Connected to Mongo! Database name: "${x.name}" "${param}"`)
      })
      .catch(err => {
          console.error('Error connecting to mongo', err)
      });
    }, 10000);
}

module.exports = connectDB2;