const express = require("express");
const getAllMsgRoute = express.Router();
const CabiMsg = require("../models/CabiMsg");

getAllMsgRoute.get("/messages/:msgID/status", (req, res, next) => {
  let getMsgs = CabiMsg("primary");
  getMsgs.find({ msgID: req.params.msgID }, (error, messagesFromDB) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json(messagesFromDB);
    }
  });
});

module.exports = getAllMsgRoute;
