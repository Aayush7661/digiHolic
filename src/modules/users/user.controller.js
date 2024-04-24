const tokenData = require("../../models/token");
const Users = require("../../models/users");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let userDetails = await Users.findOne({ email: email });
    if (userDetails) {
      return res.status(400).json({
        statusCode: 400,
        status: "failure",
        message: "email id already present",
      });
    }
    let users = new Users({
      email,
      password,
      role,
    });
    users.save();
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let userDetails = await Users.findOne({ email: email });
    if (!userDetails) {
      return res.status(400).json({
        statusCode: 400,
        status: "failure",
        message: "email Id not present",
      });
    }
    if (userDetails.password !== password) {
      return res.status(400).json({
        statusCode: 400,
        status: "failure",
        message: "Enter a wrong password",
      });
    }
    let JWTSECRETKEY = process.env.JWTSECRETKEY;
    let token = req.headers.authorization.split(" ")[1];
    let newToken;
    console.log(token);
    if (token) {
      let rol = Object.keys(userDetails.role);
      newToken = jwt.sign(
        {
          info: {
            id: userDetails._id,
            roles: rol,
          },
        },
        JWTSECRETKEY,
        {
          expiresIn: process.env.EXPIREIN,
        }
      );
      let tokendetails = await tokenData.findOne({ token });
      await tokenData.updateOne(
        { _id: tokendetails._id },
        {
          token: newToken,
          deviceId: "",
          id: userDetails._id,
        }
      );
    }
    return res.status(200).json({
      statusCode: 200,
      status: "success",
      data: userDetails,
      token: newToken,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      status: "failure",
      message: "Internal Server Error",
    });
  }
};

module.exports = { userLogin, registerUser };
