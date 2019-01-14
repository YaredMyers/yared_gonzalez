const axios = require("axios");
const axiosMessageApp = process.env.AxiosREQ;

let clientMessageApp = function(destination, body) {
  return axios.post(
    axiosMessageApp,
    { destination, body },
    { timeout: 3000 }
  );
};

module.exports = clientMessageApp;
