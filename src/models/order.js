const { required } = require("joi");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  bookiId: {
    type: String,
    ref: "bookData",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

const orderInfo = mongoose.model("orderInfo", orderSchema);

module.exports = orderInfo;
