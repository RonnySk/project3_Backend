const express = require("express");
const router = express.Router();
const Messenger = require("../models/Messenger.model");
const Message = require("../models/Message.model");

// create messenger

router.post("/createmessenger", (req, res, next) => {
  const { userId, realEstateId, propertyId } = req.body;

  Messenger.create({ userId, realEstateId, propertyId })
    .then((chat) => {
      console.log("chat", chat);
      res.status(201).json(chat);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// create Message

router.post("/message", (req, res, next) => {
  const { sender, message, messengerId } = req.body;

  Message.create({ sender, message, messengerId })
    .then((newMessage) => {
      console.log("### new message created in db: ", newMessage);
      Message.findByIdAndUpdate(
        { _id: messengerId },
        {
          $push: { messages: newMessage.message },
        },
        {
          new: true,
        }
      );
      res.status(201).json(newMessage);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.get("/:messengerId", (req, res, next) => {
  const { messengerId } = req.params;

  Messenger.findById(messengerId)
    .then((messenger) => {
      console.log("messenger", messenger);
      res.status(201).json(messenger);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
