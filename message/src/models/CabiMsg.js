const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { getConnection } = require("../mongoDBModule2");

const cabiSchema = new Schema(
  {
    msgID: { type: String },
    destination: { type: String, required: "required", unique: true },
    body: String,
    status: {
      type: String,
      enum: ["STATUS: PENDING", "STATUS: OK", "STATUS: NO", "STATUS: TIMEOUT"],
      default: "STATUS: TIMEOUT"
    }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

var CabiMsg = type => getConnection(type).model("CabiMsg", cabiSchema);

module.exports = CabiMsg;
