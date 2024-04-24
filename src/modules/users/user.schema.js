const Joi = require("joi");

const userRegisterSchem = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required(),
});

const userLoginSchem = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { userRegisterSchem, userLoginSchem };
