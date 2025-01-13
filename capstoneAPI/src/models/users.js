"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },

    firstname: {
      type: String,
      trim: true,
      required: true,
    },

    lastname: {
      type: String,
      trim: true,
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isStaff: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "users", timestamps: true }
);

UserSchema.pre(["save", "updateOne"], function (next) {
  const data = this?._update ?? this;
  const isEmailValidated = data.password
    ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.]).{8,}$/.test(
        data.password
      )
    : true;
  if (!isPasswordValidated)
    next(
      new Error(
        "Password most be at least 8 characters long and contin at least one special chracter and at least one uppercase character."
      )
    );
  if (data.password) data.password = passwordEncrypt(data.password);
  next();
});

module.exports = mongoose.model("Users", UserSchema);
