const booksData = require("../../models/books");
const orderInfo = require("../../models/order");
const Users = require("../../models/users");

const placeOrder = async (req, res) => {
  try {
    const { bookId, userId, quantity } = req.body;
    let bookDetails = await booksData.findOne({ _id: bookId });
    if (!bookDetails) {
      return res.status(400).json({
        statusCode: 400,
        status: "failure",
        message: "book details not found",
      });
    }
    let userDetails = await Users.findOne({ _id: userId });
    if (!userDetails) {
      return res.status(400).json({
        statusCode: 400,
        status: "failure",
        message: "User details not found",
      });
    }
    
    if (bookDetails.quantity < quantity) {
      return res.status(400).json({
        statusCode: 400,
        status: "failure",
        message: "require quantity not present",
      });
    }
    let totalPrice = quantity * bookDetails.price;
    const order = new orderInfo({
      userId: userId,
      bookiId: bookId,
      quantity: quantity,
      totalPrice: totalPrice,
    });
    order.save();
    let count = bookDetails.quantity - quantity
    await booksData.updateOne({_id:bookId},{quantity:count})
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      message: "order successfully execute",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

const orderHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    let userDetails = await Users.findOne({ _id: userId });
    if (!userDetails) {
      return res.status(400).json({
        statusCode: 400,
        status: "failure",
        message: "User details not found",
      });
    }
    let orderHostory = await orderInfo.find({ userId });
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      data: orderHostory,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

const orderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    let orderHostory = await orderInfo.find({ _id: orderId });
    if (!orderHostory) {
      return res.status(400).json({
        statusCode: 400,
        status: "failure",
        message: "order details not found",
      });
    }
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      data: orderHostory,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  placeOrder,
  orderDetails,
  orderHistory,
};
