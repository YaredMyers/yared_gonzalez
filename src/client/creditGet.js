const express = require('express');
const getCreditRoute = express.Router();
const CabiGlobalCredit = require("../models/CabiCredit");


getCreditRoute.get('/credit',  (req, res, next) =>{
  CabiGlobalCredit.find({}, (error, messagesFromDB) => {
		if (error) {
			next(error);
		} else {
			res.status(200).json(messagesFromDB);
		}
	});
});

module.exports = getCreditRoute;