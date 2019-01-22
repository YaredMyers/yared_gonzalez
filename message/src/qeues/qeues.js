const Queue = require("bull");
const pendingMessageSave = require("../client/PendingMsg");
const clientMessageApp = require("../messageAppAxios/clientMessageApp");
const saveMsg = require("../client/msgCreation");
const payCredit = require("../../../credit/src/validations/payCredit");
const locks = require("locks");
const mutex = locks.createMutex();

//creo la cola:
const messageQueue = new Queue("messageQueue");
const uuidv4 = require("uuid/v4");

messageQueue.process(function(job, done) {
  const msgID = job.data.msgID;
  const destination = job.data.destination;
  const body = job.data.body;

  clientMessageApp(msgID, destination, body)
    .then(resp => {
      let status = "STATUS: OK";
      return saveMsg(msgID, status);
    })
    .then(resp => {
      return payCredit()
        .then(resp => {
          done();
          console.log("STATUS: OK. msg paid good :)");
        })
        .catch(e => {
          done();
        });
    })
    .catch(e => {
      let status;
      if (e.response === undefined) {
        status = "STATUS: TIMEOUT";
      } else {
        status = "STATUS: NO";
      }
      console.log(status);
      saveMsg(msgID, status).then(() => done());
    });
});

let addToMyQueue = function(req, res, next) {
  const msgID = uuidv4();
  const messageObj = {
    msgID: msgID,
    destination: req.body.destination,
    body: req.body.body,
    status: "STATUS: PENDING"
  };

  return pendingMessageSave(messageObj)
    .then(() => {
      return messageQueue.add(messageObj);
    })
    .then(() => {
      return res.send(`processing your message ${messageObj.msgID}`);
    });
};

module.exports = addToMyQueue;