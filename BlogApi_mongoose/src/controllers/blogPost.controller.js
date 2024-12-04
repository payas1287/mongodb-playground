"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

// Call Models:
const { BlogPost } = require("../models/blogPost.models");

// BlogPost Controller:

module.exports.blogPost = {
  list: async (req, res) => {
    const data = await BlogPost.find().populate("categoryId");

    res.send({
      result: data,
    });
  },

  // CRUD ->

  create: async (req, res) => {
    const data = await BlogPost.create(req.body);

    res.send({
      result: data,
    });
  },

  read: async (req, res) => {},

  update: async (req, res) => {},

  delete: async (req, res) => {},
};

/* ------------------------------------------------------- */
