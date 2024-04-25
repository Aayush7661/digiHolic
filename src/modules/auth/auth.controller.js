const jwt = require("jsonwebtoken");
// const tokenData = require("../models/token");
const tokenData = require("../../models/token");
const Users = require("../../models/users");
const mongoose = require("mongoose");

const genrateAuthToken = async (req, res) => {
  try {
    const { id, deviceId } = req.body;
    if (!id && !deviceId) {
      return res.status(400).json({
        statusCode: 400,
        status: "failure",
        message: "please provide a valid data",
      });
    }
    let token;
    let query;
    let JWTSECRETKEY = process.env.JWTSECRETKEY;
    if (id) {
      let details = await Users.findOne({
        _id: new mongoose.Types.ObjectId(id),
      });
      if (!details) {
        return res.status(400).json({
          statusCode: 400,
          status: "failure",
          message: "details not found",
        });
      }
      query = { id: id };
      let rol;
      if (details.role === "USER") {
        rol = { USER: "USER" };
      }
      if (details.role === "ADMIN") {
        rol = { ADMI: "ADMIN" };
      }
      let roles = Object.keys(rol);
      token = jwt.sign(
        {
          info: {
            id: details._id,
            roles: roles,
          },
        },
        JWTSECRETKEY,
        {
          expiresIn: process.env.EXPIREIN,
        }
      );
    } else {
      // let JWTSECRETKEY = process.env.JWTSECRETKEY;
      query = { deviceId: deviceId };
      let roles = Object.keys("USER");
      token = jwt.sign(
        {
          info: {
            deviceId: deviceId,
            roles: roles,
          },
        },
        JWTSECRETKEY,
        {
          expiresIn: process.env.EXPIREIN,
        }
      );
    }
    let data = await tokenData.findOne(query);
    if (data) {
      await tokenData.updateOne({ _id: data._id }, { token: token });
    } else {
      let tokenDat = new tokenData({
        toke: token,
        userId: id ? id : "",
        deviceId: deviceId ? deviceId : "",
      });
      await tokenDat.save();
    }
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      data: token,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

module.exports = { genrateAuthToken };
