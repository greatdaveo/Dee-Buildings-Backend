const express = require("express");
const verifyUserToken = require("../utils/verifyUser");
const listingController = require("../controllers/listingController");
const deleteListing = require("../controllers/listingController");
const updateListing = require("../controllers/listingController");
const getListing = require("../controllers/listingController");

const router = express.Router();

router.post("/create", verifyUserToken, listingController);
router.delete("/delete/:id", verifyUserToken, deleteListing);
router.post("/update/:id", verifyUserToken, updateListing);
router.get("/get-listing/:id", getListing);

module.exports = router;
