const Queue = require("bull");
const logger = require('../winston/logs');
const checkCredit = require("../validations/creditValidation");

const payCredit = require("../validations/payCredit");
const creditQueue = new Queue(
  "creditQueue",
  "redis://yared_gonzalez_redis_1:6379"
);
const messageQueue = new Queue(
  "messageQueue",
  "redis://yared_gonzalez_redis_1:6379"
);

const uuidv4 = require("uuid/v4");

creditQueue.process(function(job, done) {

  return checkCredit(job).then(checkMyCabiCredit => {
    if (checkMyCabiCredit.status === "STATUS: OK") {
      logger.info(checkMyCabiCredit, "CHECKMYCABICREDIT");
      return payCredit()
        .then(() => messageQueue.add(checkMyCabiCredit))
        .then(done);
    }
  });
});

module.exports = { creditQueue, messageQueue };
