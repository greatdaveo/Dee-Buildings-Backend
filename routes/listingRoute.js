const express = require("express");
const verifyUserToken = require("../utils/verifyUser");
const listingController = require("../controllers/listingController");

const router = express.Router();

router.post("/create", verifyUserToken, listingController);

module.exports = router;
