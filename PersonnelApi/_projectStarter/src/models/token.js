"use strict";

const { mongoose } = require("../configs/dbConnection");
const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: moongoose.Schema.Types.ObjectId,
      ref: "Personel",
      required: true,
      index: true,
      unique: true,
    },
  },
  {
    collection: "tokens",
    timestamps: true,
  }
);
module.exports = mongoose.model("Token", TokenSchema);
