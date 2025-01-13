"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const CommentsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },

    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blogs",
      required: true,
      index: true,
    },

    comment: {
      types: String,
      index: true,
    },
  },
  { collection: "comment", timestamps: true }
);

module.exports = mongoose.model("Comments", CommentsSchema)
