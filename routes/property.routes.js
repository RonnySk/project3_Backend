const express = require("express");
const Property = require("../models/Property.model");
const router = express.Router();

// create add new Property route

router.post("/addProperty", async (req, res, next) => {
  try {
    const newProperty = await Property.create(req.body);
    console.log("add new propertie", newProperty);

    res.status(201).json({ newProperty });
  } catch (err) {
    next(err);
  }
});

// get one Property by ID route

router.get("/property/:property_id", async (req, res, next) => {
  try {
    const { propertyId } = req.params;

    const oneProperty = await Property.findById(propertyId);

    res.status(201).json({ oneProperty });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
