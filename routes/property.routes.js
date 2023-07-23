const express = require("express");
const Property = require("../models/Property.model");
const router = express.Router();
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const cors = require("cors");
const Multer = require("multer");

//upload img route

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
}

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

router.post("/upload", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);

    console.log("uploaded img", cldRes);

    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

// create add new Property route

router.post(
  "/addProperty",
  upload.single("my_file"),
  async (req, res, next) => {
    try {
      const newProperty = await Property.create(req.body);
      console.log("add new propertie", newProperty);

      res.status(201).json({ newProperty });
    } catch (err) {
      next(err);
    }
  }
);

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

// get Real Estate all properties route

router.get("/realestateallproperties/:agent_id", async (req, res, next) => {
  try {
    const { agent_id } = req.params;

    const realEstateAllProperties = await Property.find({ userId: agent_id });

    res.status(201).json(realEstateAllProperties);
  } catch (err) {
    next(err);
  }
});

// Delete properties route

router.delete("/:property_id", async (req, res, next) => {
  try {
    const { property_id } = req.params;

    await Property.findByIdAndRemove(property_id);

    res.status(201).json({
      message: `Project with ${property_id} is removed successfully.`,
    });
  } catch (err) {
    next(err);
  }
});

// Update Property route

router.post("/updateProperty/:property_id", async (req, res, next) => {
  try {
    const { property_id } = req.params;

    console.log("req.body", req.body);
    const updateProperty = await Property.findByIdAndUpdate(
      property_id,
      req.body,
      {
        new: true,
      }
    );

    console.log("updateProperty", updateProperty);
    res.status(201).json(updateProperty);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
