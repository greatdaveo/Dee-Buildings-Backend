const ListingModel = require("../models/ListingModel");

const listingController = async (req, res, next) => {
  try {
    const listingData = await ListingModel.create(req.body);
    return res.status(201).json(listingData);
  } catch (error) {
    next(error);
  }
};

const deleteListing = async (req, res, next) => {
  const listing = await ListingModel.findById(req.params.id);
  if (!listing) {
    return next(errorHandling(404, "Listing not found!"));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }

  try {
    await ListingModel.findById(req.params.id);
    res.status(200).json("Listing has been deleted!");
  } catch (error) {
    next(error);
  }
};

module.exports = listingController;
module.exports = deleteListing;
