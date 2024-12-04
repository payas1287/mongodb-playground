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

  read: async (req, res) => {
    const data = await BlogPost.read(req.body);

    res.send({
      result: data,
    })
  },

  update: async (req, res) => {
    const data = await BlogPost.update(req.body);

    res.send({
      result: data,
    })
  },

  delete: async (req, res) => {
    const data = await BlogPost.delete(req.body);

    res.send({
      result: data,
    })
  },
};

/* ------------------------------------------------------- */
