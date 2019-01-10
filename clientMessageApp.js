const axios = require("axios");


let clientMessageApp = function(destination,body) {
  return axios.post("http://yared_gonzalez_messageapp_1:3000/message", {destination, body}, {timeout: 3000});
};

module.exports = clientMessageApp;
