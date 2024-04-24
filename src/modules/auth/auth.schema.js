const Joi = require("joi");

const genrateAuthTokenSchema = Joi.object({
  id: Joi.string().optional(),
  deviceId: Joi.string().optional(),
  // role: Joi.string().required(),
});

module.exports = {genrateAuthTokenSchema}
