const UserModel = require("../models/UserModel");
// For password encryption
const bcryptjs = require("bcryptjs");
// For handling errors
const errorHandler = require("../utils/Error");
// To handle cookies
const jwt = require("jsonwebtoken");

// For Registration
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

// For Login
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await UserModel.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    // To compare password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(401, "Incorrect email or password!"));
    // To handle cookie
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // To send other user info except the password to the client for security reasons
    const { password: passwd, ...otherInfo } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(otherInfo);
  } catch (error) {
    next(error);
  }
};

module.exports = register;
module.exports = login;
