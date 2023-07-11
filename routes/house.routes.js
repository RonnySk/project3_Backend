// const router = require("express").Router();

const express = require("express");
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
    user_id,
  } = req.body;
  console.log("reponse from req.body", req.body);
});

module.exports = router;
