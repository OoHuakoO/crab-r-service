const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  try {
    const bearerHeader = req?.headers["authorization"];
    if (!bearerHeader) {
      return res.json({
        data: "a token is required for authentication",
        status: 403,
      });
    }
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    const decode = jwt.verify(bearerToken, process.env.TOKEN_KEY);
    req.user = decode;
  } catch {
    return res.json({ data: "invalid token", status: 401 });
  }
  return next();
};

module.exports = verifyToken;
