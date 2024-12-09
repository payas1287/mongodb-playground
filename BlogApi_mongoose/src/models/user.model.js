"use strict";

const mongoose = require("mongoose");
const paswordEncypt = require("../helper/passwordEncrypt");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      uniquie: true,
      validate: [
        function (email) {
          return email.includes("@") && email.includes(".");
        },
        "Email format is incorrect",
      ],
    },
    password: {
      type: String,
      trim: [true, "Password is required"],
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

module.exports.model("User", UserSchema);
