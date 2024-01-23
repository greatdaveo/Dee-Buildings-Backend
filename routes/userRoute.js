const express = require("express");
const testController = require("../controllers/userController.js");
const updateUserInfo = require("../controllers/userController.js");
const verifyUserToken = require("../utils/verifyUser.js");
const deleteUser = require("../controllers/userController.js");

const router = express.Router();

router.get("/test", testController);
router.post("/update/:id", verifyUserToken, updateUserInfo);
router.delete("/delete/:id", verifyUserToken, deleteUser);

module.exports = router;
