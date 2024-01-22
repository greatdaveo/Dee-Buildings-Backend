const jwt = require("jsonwebtoken");
const errorHandler = require("./Error");

const verifyUserToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(401, "You are an unauthorized user!");

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Forbidden"));

    req.user = user;
    next();
  });
};

module.exports = verifyUserToken;
