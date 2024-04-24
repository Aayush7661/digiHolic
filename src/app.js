const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const device = require("express-device");
const morgan = require('morgan')
const { tokenRouter } = require("./modules/auth/auth.routes");
const { booksRouter } = require("./modules/books/books.routes");
const { orderRouter } = require("./modules/orders/orderInfo.routes");
const { usersRouter } = require("./modules/users/user.routes");

const app = express();
let corsOption = {
  origin: "*",
  Credential: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOption));
app.use(express.json());
app.use(morgan("dev"));
app.use(device.capture());
app.use("/api/auth", tokenRouter);
app.use("/api/books", booksRouter);
app.use("/api/order", orderRouter);
app.use("/api/user", usersRouter);
let DB = process.env.DB;
let port = process.env.PORT || 3007;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB is connected");
  });

app.listen(port, () => console.log(`Server started on port ${port}`));
