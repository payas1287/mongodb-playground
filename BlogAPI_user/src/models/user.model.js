"use strict";

const mongoose = require("mongoose");
const paswordEncypt = require("../helper/passwordEncrypt");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required."],
      validate: [
        function (email) {
          console.log("this", this);
          return email.includes("@") && email.includes(".");
        },
        "Email format is incorrect",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      set: (password) => paswordEncypt(password),
    },
    firstname: String,
    lastname: String,
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = {
  User: mongoose.model("User", UserSchema),
};
