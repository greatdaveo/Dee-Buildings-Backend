const express = require("express");
const register = require("../controllers/authController.js");
const login = require("../controllers/authController.js");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);


module.exports = authRouter;
