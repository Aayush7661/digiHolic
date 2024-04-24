const express = require("express");
const { validators, ValidationSource } = require("../../middlewares/validator");
const { roleList } = require("../../middlewares/rolesList");
const { authMiddleware } = require("../../middlewares/auth");
const {
  placeOrder,
  orderDetails,
  orderHistory,
} = require("./orderInfo.controller");
const { orderDetailsSchem, orderHistorySchem, orderSchem } = require("./orderInfo.schema");
const { verifyRoles } = require("../../middlewares/verifyRoles");
const orderRouter = express.Router();

orderRouter.post(
  "/order",
  authMiddleware,
  verifyRoles(roleList.USER),
  validators(orderSchem),
  placeOrder
);
orderRouter.get(
  "/orderHistory/:userId",
  authMiddleware,
  verifyRoles(roleList.USER, roleList.ADMIN),
  validators(orderHistorySchem, ValidationSource.PAREM),
  orderHistory
);
orderRouter.get(
  "/orderDetails/:orderId",
  authMiddleware,
  verifyRoles(roleList.USER, roleList.ADMIN),
  validators(orderDetailsSchem, ValidationSource.PAREM),
  orderDetails
);

module.exports = { orderRouter };
