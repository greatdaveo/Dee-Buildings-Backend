const errorHandler = require("../utils/Error");
const bcrypt = require("bcryptjs");

const testController = (req, res) => {
  res.json({ message: "Server testing is successful!" });
};

const updateUserInfo = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
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

module.exports = testController;
module.exports = updateUserInfo;
