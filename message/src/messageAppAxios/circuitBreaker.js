const circuitBreaker = require("opossum");
const clientMessageApp = require("./clientMessageApp");

const options = {
  timeout: 3000, // If our function takes longer than 3 seconds, trigger a failure
  errorThresholdPercentage: 50, // When 50% of requests fail, trip the circuit
  resetTimeout: 30000 // After 30 seconds, try again.
};
const breaker = circuitBreaker(clientMessageApp, options);


module.exports = breaker;
