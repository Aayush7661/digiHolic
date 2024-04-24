const mongoose = require("mongoose");

const { Schema } = mongoose;
const booksDataSchema = new Schema(
  {
    title: {
      type: String,
    },
    author: {
      type: String,
    },
    ISBN: {
      type: String,
    },
    genre: {
      type: String,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);
const booksData = mongoose.model("booksData", booksDataSchema);

module.exports = booksData;
