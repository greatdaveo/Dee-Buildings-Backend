const UserModel = require("../models/UserModel");
// For password encryption
const bcryptjs = require("bcryptjs");

const register = async (req, res) => {
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
  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = register;
