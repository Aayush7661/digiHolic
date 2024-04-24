const ValidationSource = {
  BODY: "body",
  HEADER: "headers",
  QUERY: "query",
  PAREM: "perms",
};

const validators =
  (Schema, source = ValidationSource.BODY) =>
  (req, res, next) => {
    try {
      const { error } = Schema.validate(req[source]);
      if (!error) return next();
      const { details } = error;
      const message = details
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",");
      return res.status(500).json({
        message,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

module.exports = { validators, ValidationSource };
