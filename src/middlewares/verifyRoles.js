const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) {
      return res.status(401).json({
        statusCode: 401,
        status: "failure",
      });
    }
    const roleArray = [...allowedRoles];
    let result =
      req?.roles.map((role) => roleArray.includes(role)) ||
      allowedRoles.includes(rolelist.ADMIN);
    if (!result) {
      return res.status(401).json({
        statusCode: 401,
        status: "failure",
      });
    }
    next();
  };
};

module.exports = { verifyRoles };
