const circuitBreaker = require("opossum");
const clientMessageApp = require("./clientMessageApp");

const options = {
  timeout: 3000, 
  errorThresholdPercentage: 50, 
  resetTimeout: 30000 
};
const breaker = circuitBreaker(clientMessageApp, options);

breaker.on('success', (result) =>   console.log('!!!!!!!!!!!!!!!!!!!!!!!!SUCCESSFULLY!!!!!!!!!!!!!!!!!!!!!!!!'))
breaker.on('timeout', (result) => console.log('!!!!!!!!!!!!!!!!!!!!!!!!TIMEOUT!!!!!!!!!!!!!!!!!!!!!!!!'))
breaker.on('reject', (result) => console.log('!!!!!!!!!!!!!!!!!!!!!!!!REJECT!!!!!!!!!!!!!!!!!!!!!!!!'))




module.exports = breaker;
