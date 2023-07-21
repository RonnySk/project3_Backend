const { Schema, model } = require("mongoose");

const messengerSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  realEstateId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  propertyId: {
    type: Schema.Types.ObjectId,
    ref: "Property",
  },

  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },
  ],

  created_at: { type: Date, default: Date.now },

  updated_at: { type: Date, default: Date.now },
});

const Messenger = model("Messenger", messengerSchema);

module.exports = Messenger;
