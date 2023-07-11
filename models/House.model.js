const { Schema, model } = require("mongoose");

const houseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      required: true,
    },

    room: {
      type: Number,
      required: true,
    },

    bathroom: {
      type: Number,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    garage: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
