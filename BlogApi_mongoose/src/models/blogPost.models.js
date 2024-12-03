"use strict";

const mongoose = require("mongoose");

const BlogPostSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId(),
      ef: "BlogCategory",
      required: true,
    },
    title: {
      type: String,
      trim: true,
      required: true,
    },
    content: {
      tyepe: true,
      trim: true,
      required: true,
    },
    // createdAt // timestamps: true
    // updatedAt // timestamps: true
  },
  {
    collection: "blogPosts",
    timestamps: true,
  }
);

module.exports = {
  BlogPost: mongoose.model("BlogPost", BlogPostSchema),
};
