const circuitBreaker = require("opossum");
const clientMessageApp = require("./clientMessageApp");
const logger = require('../winston/logs')

const options = {
  timeout: 3000,
  errorThresholdPercentage: 50,
  resetTimeout: 30000
};
const breaker = circuitBreaker(clientMessageApp, options);

breaker.on("success", result =>
  // console.log("!!!!!!!!!!!!!!!!!!!!!!!!SUCCESSFULLY!!!!!!!!!!!!!!!!!!!!!!!!")
  logger.info("!!!!!!!!!!!!!!!!!!!!!!!!SUCCESSFULLY!!!!!!!!!!!!!!!!!!!!!!!!")
);
breaker.on("timeout", result =>
logger.error("!!!!!!!!!!!!!!!!!!!!!!!!TIMEOUT!!!!!!!!!!!!!!!!!!!!!!!!")
);
breaker.on("reject", result =>
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!REJECT!!!!!!!!!!!!!!!!!!!!!!!!")
);

module.exports = breaker;
