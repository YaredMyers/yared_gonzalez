const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const globalCreditSchema = new Schema({
  amount: Number,
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const CabiGlobalCredit = mongoose.model('CabiGlobalCredit', globalCreditSchema);
module.exports = CabiGlobalCredit;