"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, //* one to one
      index: true,
    },
    token: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      index: true,
    },
  },
  { collection: "tokens", timestamps: true }
);

module.exports = mongoose.model("Token", TokenSchema);
