const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const tokenData = require("../models/token");
const Users = require("../models/users");
const authMiddleware = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (token) {
    try {
      let JWTSECRETKEY = process.env.JWTSECRETKEY;
      const decoded = await promisify(jwt.verify)(
        token,
        JWTSECRETKEY
      );
      if (!decoded) {
        return res.status(400).json({
          statusCode: 400,
          status: "failure",
          message: "valid token not present",
        });
      }
      if (decoded.info.id) {
        let tokenDetails = await tokenData.findOne({
          token: token,
          id: decoded.info.id,
        });
        if (!tokenDetails) {
          return res.status(400).json({
            statusCode: 400,
            status: "failure",
            message: "valid token not present",
          });
        }
        let userDetails = await Users.findOne({ _id: decoded.info.id });
        if (!userDetails) {
          return res.status(400).json({
            statusCode: 400,
            status: "failure",
            message: "valid token not present",
          });
        }
        req.user = decoded.info.id;
        req.roles = decoded.info.roles;
      } else {
        let deviceToken = await tokenData.findOne({
          token: token,
          deviceId: decoded.info.deviceId,
        });
        if (!deviceToken) {
          return res.status(400).json({
            statusCode: 400,
            status: "failure",
            message: "valid token not present",
          });
        }
        req.roles = decoded.info.roles;
      }
    } catch (error) {
      return res.status(500).json({
        statusCode: 500,
        status: "failure",
        message: "Internal Server Error",
      });
    }
  }
  next();
};

module.exports = { authMiddleware };
