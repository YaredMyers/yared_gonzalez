const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getConnection } = require("../mongoDBModule2");


const cabiSchema = new Schema({
  msgID: {type: String, unique: true},
  destination: { type: String, required: "required", unique: true },
  body: String,
  status: { type: String, enum: ["STATUS: PENDING", "STATUS: OK", "STATUS: NO", "STATUS: TIMEOUT"], default: "STATUS: TIMEOUT" },
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

// const CabiMsg = mongoose.model('CabiMsg', cabiSchema); por si todo se jode

const CabiMsg = type => getConnection(type).model("CabiMsg", cabiSchema)
module.exports = CabiMsg;