const axios = require("axios");
const axiosMessageApp = process.env.AxiosREQ;
const logger = require('../winston/logs');

let clientMessageApp = function(destination, body) {
  return axios
    .post(axiosMessageApp, { destination, body }, { timeout: 15000 })
    .then(resp => {
      logger.info("OK");
    })
    .catch(e => {
      if (e.message === undefined) {
        throw new Error("Timeout");
      } else {
        throw "CircuitBreaker is Open Now";
      }
    });
};

module.exports = clientMessageApp;
