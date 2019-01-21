const express = require("express");
const getCreditRoute = express.Router();
const CabiCredit = require("../models/CabiCredit");

getCreditRoute.get("/credit", (req, res, next) => {
  CabiCredit.find({}, (error, messagesFromDB) => {
    if (error) {
      next(error);
    } else {
      res.status(200).json(messagesFromDB);
    }
  });
});

module.exports = getCreditRoute;

if (CabiCredit > 0) {
  CabiCredit.findByIdAndUpdate({ amount: amount - 1 });
}
