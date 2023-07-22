const { Schema, model } = require("mongoose");

const propertySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    street: {
      type: String,
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

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    imgUrl: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Property = model("Property", propertySchema);

module.exports = Property;
