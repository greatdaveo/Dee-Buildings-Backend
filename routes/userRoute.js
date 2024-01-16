const express = require("express");
const testController = require("../controllers/userController.js");

const router = express.Router();

router.get("/test", testController);

module.exports = router;
