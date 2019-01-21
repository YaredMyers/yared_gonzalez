const express = require('express');
const getAllMsgRoute = express.Router();
const CabiMsg = require("../models/CabiMsg");

getAllMsgRoute.get('/messages',  (req, res, next) =>{
  CabiMsg('primary').find({}, (error, messagesFromDB) => {
		if (error) {
			next(error);
		} else {
			res.status(200).json(messagesFromDB);
		}
	});
});

module.exports = getAllMsgRoute;



