const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {conn, conn2} = require("../mongoDBModule2");
// const conn2 = require("../mongoDBModule2");

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


var CabiCredit = conn.model("CabiCredit", globalCreditSchema);
var CabiCredit2 = conn2.model("CabiCredit2", globalCreditSchema);

// const CabiCredit =  conn.model('CabiCredit', globalCreditSchema);
// const CabiCredit2 = conn2.model('CabiCredit2', globalCreditSchema);

// const CabiGlobalCredit = mongoose.model("CabiGlobalCredit", globalCreditSchema);  // meter en moduleexport CabiGlobalCredit
module.exports = { CabiCredit, CabiCredit2 };
