"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
const passwordEncrypt = require("../helpers/passwordEncrypt");
/* ------------------------------------------------------- */

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    set: (password) => passwordEncrypt(password),
  },
  email: {
    type: String,
    required: true,
    uniqeu: true,
    trim: true,
    validate: [
      (email) => email.includes("@") && email.includes("."),
      "Email is not valid",
    ],
  },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: true,
    trim: true,
    required: true,
  },
  isStaff: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
},
{ collection: "user", timestamps: true});

module.exports = mongoose.model("User", UserSchema);
