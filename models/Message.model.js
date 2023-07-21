const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  message: { type: String },

  created_at: { type: Date, default: Date.now },
});

const Message = model("Message", messageSchema);

module.exports = Message;
