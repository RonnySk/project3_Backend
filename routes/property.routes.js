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

// get all properties route

router.get("/allproperties", async (req, res, next) => {
  try {
    const allProperty = await Property.find();

    res.status(201).json({ allProperty });
  } catch (err) {
    next(err);
  }
});

// get one Property by ID route

router.get("/oneproperty/:property_id", async (req, res, next) => {
  try {
    const { property_id } = req.params;
    console.log("property_id", property_id);
    const oneProperty = await Property.findById(property_id);

    res.status(201).json({ oneProperty });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
