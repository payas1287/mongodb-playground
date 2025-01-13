"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const BlogsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
      index: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
      index: true,
    },
    title: {
      type: "String",
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    content: {
      type: "String",
      trim: true,
      require: true,
      unique: true,
      index: true,
    },
    image: {
      type: "String",
      trim: true,
    },
    isPublish: {
      type: "String",
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    likes: {
      type: "Boolean",
      index: true,
    },
    countOfVisitors: {
      type: "Number",
      index: true,
    },
  },
  { collection: "blogs", timestamps: true }
);

module.exports = mongoose.model("Blogs", BlogsSchema);
