const express = require("express");
const {
  register,
  login,
  google,
  logout,
} = require("../controllers/authController.js");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/google", google);
authRouter.get("/logout", logout);



module.exports = authRouter;
