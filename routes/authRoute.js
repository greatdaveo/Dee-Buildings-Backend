const express = require("express");
const register = require("../controllers/authController.js");
const login = require("../controllers/authController.js");
const google = require("../controllers/authController.js");

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/google", google);


module.exports = authRouter;
