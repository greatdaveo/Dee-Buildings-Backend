const ListingModel = require("../models/ListingModel");

const listingController = async (req, res, next) => {
  try {
    const listingData = await ListingModel.create(req.body);
    return res.status(201).json(listingData);
  } catch (error) {
    next(error);
  }
};

module.exports = listingController;
