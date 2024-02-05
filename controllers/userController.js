const errorHandler = require("../utils/Error");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/UserModel");
const ListingModel = require("../models/ListingModel");

const testController = (req, res) => {
  res.json({ message: "Server testing is successful!" });
};

const updateUserInfo = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    if (req.body.password) {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...otherInfo } = updatedUser._doc;
    res.status(200).json(otherInfo);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id === req.params.id)
    return errorHandler(
      401,
      "Unfortunately, you can only delete your own account!"
    );

  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("Your account has been deleted successfully!");
  } catch (error) {
    next(error);
  }
};

const getUserListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await ListingModel.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};

module.exports = testController;
module.exports = updateUserInfo;
module.exports = deleteUser;
module.exports = getUserListings;


