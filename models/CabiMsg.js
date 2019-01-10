const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cabiSchema = new Schema({
  destination: { type: String, required: "required", unique: true },
  body: String,
},
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

const CabiMsg = mongoose.model('CabiMsg', cabiSchema);
module.exports = CabiMsg;