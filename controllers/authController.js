const UserModel = require("../models/UserModel");
// For password encryption
const bcryptjs = require("bcryptjs");
// For handling errors
const errorHandler = require("../utils/Error")

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  //   console.log(req.body);
  try {
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json("User account created successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = register;
