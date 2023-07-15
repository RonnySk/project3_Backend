const router = require("express").Router();
const HousingProfile = require("../models/HousingProfile.model");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/housingprofile", (req, res, next) => {
  const { loanAmount, calculatorData } = req.body;
  HousingProfile.create({ loanAmount, calculatorData })
    .then((housingProfile) => {
      console.log(housingProfile);
      res.status(201).json(housingProfile);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
