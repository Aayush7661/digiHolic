const Joi = require("joi");

const orderDetailsSchem = Joi.object({
  orderId: Joi.string().required(),
});

const orderHistorySchem = Joi.object({
  userId: Joi.string().required(),
});

const orderSchem = Joi.object({
  bookId: Joi.string().required(),
  userId: Joi.string().required(),
  quantity: Joi.number().required(),
});

module.exports = {
  orderSchem,
  orderHistorySchem,
  orderDetailsSchem,
};
