const router = require("express").Router();
const HousingProfile = require("../models/HousingProfile.model");
const { Configuration, OpenAIApi } = require("openai");
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

// chatbot
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post("/chatbot", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-4-0314",
      messages: [
        { role: "system", content: "You are consultant for people buying houses." },
        { role: "user", content: userMessage },
      ],
    });

    res.send(chatResponse.data.choices[0].message.content);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error processing the request");
  }
});

module.exports = router;
