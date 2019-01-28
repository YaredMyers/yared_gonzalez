const CabiMsg = require("../models/CabiMsg");
const saveMsg = require("../client/msgCreation");
const clientMessageApp = require("../messageAppAxios/clientMessageApp");
const pendingMessageSave = require("../client/PendingMsg");
const uuidv4 = require("uuid/v4");
const logger = require("../winston/logs");

const { creditQueue } = require("../qeues/qeues");

let fieldsValidation = function(request, response, next) {
  const { destination, body } = request.body;
  if (typeof destination !== "string" || typeof body !== "string") {
    response.status(400);
    response.send("It has to be an string");
  } else if (destination === "" || body === "") {
    response.status(400);
    response.send("You have empty files, why are you so lazy?");
  } else if (destination !== "" && !destination.includes("@")) {
    response.status(400);
    response.send("Destination has to be an email");
  } else if (destination.length > 30 || body.length > 50) {
    response.status(400);
    response.send("You only can use 30 characters or less");
  } else {
    if (qeuesLenght(recoverSistem, response)) {
      const msgID = uuidv4();

      const msgObj = {
        type: "Check available credit",
        msgID: msgID,
        destination: request.body.destination,
        body: request.body.body,
        status: "STATUS: OK"
      };

      pendingMessageSave(msgObj).then(() => {
        creditQueue.add(msgObj);
        response.send(`processing your message ${msgObj.msgID}`);
      });
    } else {
      response.send("Many conects, try again in a few minutes");
    }
  }
};

let recoverSistem = false;

let qeuesLenght = function(recoverSistem, response) {
  return creditQueue.count().then(resp => {
    if (recoverSistem === false) {
      if (resp > 10) {
        recoverSistem = true;
        response.send("Too much messages in qeue");
        return false;
      }
      if (resp < 10) {
        return true;
      }
      {
        if (recovery === true) {
          if (resp < 5) {
            recoverSistem = false;
            return true;
          }
          if (resp > 5) {
            response.send(
              "So much requests, try again in a few minutes please"
            );
            return false;
          }
        }
      }
    }
  });
};

module.exports = fieldsValidation;
