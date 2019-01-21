const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getConnection } = require("../mongoDBModule2");

const globalCreditSchema = new Schema(
  {
    amount: Number
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

// var conn      = mongoose.createConnection(process.env.CabiDB, { useNewUrlParser: true });
// var conn2     = mongoose.createConnection(process.env.CabiDB2, { useNewUrlParser: true });

var CabiCredit = type =>
  getConnection(type).model("CabiCredit", globalCreditSchema);

module.exports = CabiCredit ;
