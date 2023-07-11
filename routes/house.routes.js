const express = require("express");
const House = require("../models/House.model");
const router = express.Router();

// create new House route

router.post("/createHouse", (req, res, next) => {
  const {
    title,
    price,
    type,
    size,
    room,
    bathroom,
    year,
    garage,
    description,
    userId,
  } = req.body;

  House.create({
    title,
    price,
    type,
    size,
    room,
    bathroom,
    year,
    garage,
    description,
    userId,
  });

  console.log("reponse from req.body", req.body);
});

module.exports = router;
