const express = require("express");
const { validators } = require("../../middlewares/validator");
const { userLogin, registerUser } = require("./user.controller");
const { authMiddleware } = require("../../middlewares/auth");
const { roleList } = require("../../middlewares/rolesList");
const { userRegisterSchem, userLoginSchem } = require("./user.schema");
const { verifyRoles } = require("../../middlewares/verifyRoles");

const usersRouter = express.Router();

usersRouter.post(
    "/signUp",
    authMiddleware,
    verifyRoles(roleList.USER, roleList.ADMIN),
    validators(userRegisterSchem),
    registerUser
  );
  

usersRouter.post(
  "/singIn",
  authMiddleware,
  verifyRoles(roleList.USER, roleList.ADMIN),
  validators(userLoginSchem),
  userLogin
);

module.exports = { usersRouter };
