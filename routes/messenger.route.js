const express = require("express");
const router = express.Router();
const Messenger = require("../models/Messenger.model");
const Message = require("../models/Message.model");

// create messenger

router.post("/createmessenger", async (req, res, next) => {
  try {
    const { userId, realEstateId, propertyId } = req.body;

    const createMessenger = await Messenger.create({
      userId,
      realEstateId,
      propertyId,
    });

    console.log("new Messenger", createMessenger);
    res.status(201).json(createMessenger);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create Message

router.post("/message", async (req, res, next) => {
  try {
    const { sender, message, messenger_id } = req.body;

    const createMessage = await Message.create({ sender, message });
    console.log("createMessage", createMessage);
    const updateMessenger = await Messenger.findByIdAndUpdate(
      messenger_id,
      {
        $push: { messages: createMessage._id },
      },
      {
        new: true,
      }
    ).populate({
      path: "messages",
      populate: { path: "sender" },
    });

    console.log("updateMessenger", updateMessenger.messages);
    res.status(201).json(updateMessenger.messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get the Messenger route

router.get("/message/:messenger_id", async (req, res, next) => {
  try {
    const { messenger_id } = req.params;

    const oneMessenger = await Messenger.findById(messenger_id).populate({
      path: "messages",
      populate: { path: "sender" },
    });

    res.status(201).json(oneMessenger);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all Inbox/Messenger

router.get("/allmessenger/:user_id", async (req, res, next) => {
  try {
    const { user_id } = req.params;

    const findAllInbox = await Messenger.find({
      $or: [{ userId: user_id }, { realEstateId: user_id }],
    }).populate("userId");

    console.log("all messenger", findAllInbox);
    res.status(201).json(findAllInbox);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
