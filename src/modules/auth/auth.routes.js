const express = require("express");
const { genrateAuthToken } = require("./auth.controller");
const { genrateAuthTokenSchema } = require("./auth.schema");
const { validators } = require("../../middlewares/validator");
const tokenRouter = express.Router();

tokenRouter.post(
  "/genrateToken",
  validators(genrateAuthTokenSchema),
  genrateAuthToken
);

module.exports = { tokenRouter };
