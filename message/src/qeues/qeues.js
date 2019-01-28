const Queue = require("bull");
const clientMessageApp = require("../messageAppAxios/clientMessageApp");
const saveMsg = require("../client/msgCreation");
const messageQueue = new Queue(
  "messageQueue",
  "redis://yared_gonzalez_redis_1:6379"
);
const creditQueue = new Queue(
  "creditQueue",
  "redis://yared_gonzalez_redis_1:6379"
); //addToMyCreditQueue
const uuidv4 = require("uuid/v4");
const breaker = require("../messageAppAxios/circuitBreaker");
const logger = require('../winston/logs');

messageQueue.process(function(job, done) {
  if (job.data.type === "Check my Credit" && job.data.status === "STATUS: NO") {
    logger.info("no hay credito");
    done();
  } else if (
    job.data.type === "Check my Credit" &&
    job.data.status === "STATUS: OK"
  ) {
    const msgID = job.data.message.msgID;
    const destination = job.data.message.destination;
    const body = job.data.message.body;

    return breaker
      .fire(destination, body)
      .then(resp => {
        let status = "OK";
        return saveMsg(msgID, status);
      })
      .catch(e => {
        let status;
        logger.info(e.message, "EN CATCH");
        if (e.response === undefined) {
          return (status = e);
        } else {
          return (status = e);
        }

        saveMsg(msgID, status).then(() => done());
      });
  } else {
    logger.info("no enviado");
  }
});

module.exports = { messageQueue, creditQueue };
