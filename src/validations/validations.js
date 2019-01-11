const CabiMsg = require("../models/CabiMsg");
const saveMsg = require("../client/msgCreation");
const clientMessageApp = require("../messageAppAxios/clientMessageApp");

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
    clientMessageApp(destination, body)
      .then(resp => {
        var status = "STATUS: OK";
        saveMsg(destination, body, status);
        response.status(200);
        response.send("STATUS: OK. Msg saved and external request made good");
      })
      .catch(e => {
        if (e.response === undefined) {
          var status = "STATUS: TIMEOUT";
          saveMsg(destination, body, status);
          response.status(408);
          response.send("STATUS: TIMEOUT");
        } else {
          var status = "STATUS: NO";
          saveMsg(destination, body, status);
          response.status(500);
          response.send("Msg saved, but external request failed");
        }
      });
  }
};

module.exports = fieldsValidation;
