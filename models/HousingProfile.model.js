const { Schema, model } = require("mongoose");

const housingProfileSchema = new Schema(
  {
    loanAmount: {
      type: Number,
      required: true,
    },
    calculatorData: {
      type: Object,
      required: true,
    },

    // userId: {
    //   type: Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  {
    timestamps: true,
  }
);

const HousingProfile = model("HousingProfile", housingProfileSchema);

module.exports = HousingProfile;
