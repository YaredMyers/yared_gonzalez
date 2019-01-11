const axios = require("axios");

let clientMessageApp = function(destination, body) {
  return axios.post(
    process.env.AxiosREQ,
    { destination, body },
    { timeout: 3000 }
  );
};

module.exports = clientMessageApp;
