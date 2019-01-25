const circuitBreaker = require("opossum");
const clientMessageApp = require("./clientMessageApp");

const options = {
  timeout: 3000, 
  errorThresholdPercentage: 50, 
  resetTimeout: 30000 
};
const breaker = circuitBreaker(clientMessageApp, options);

breaker.on('Successfully', (result) =>   console.log('!!!!!!!!!!!!!!!!!!!!!!!!SUCCESSFULLY!!!!!!!!!!!!!!!!!!!!!!!!'))
breaker.on('Timeout', (result) => console.log('!!!!!!!!!!!!!!!!!!!!!!!!TIMEOUT!!!!!!!!!!!!!!!!!!!!!!!!'))




module.exports = breaker;
