const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: { type: String, required: true },

    isAgent: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
