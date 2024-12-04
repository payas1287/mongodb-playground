"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
const router = require("express").Router();
// Call Controllers:
const { blogPost } = require("../controllers/blogPost.controller");

/* ------------------------------------------------------- */
// URL: /blog ->
// /blog/post
// BlogPost
router.route("/").get(blogPost.list).post(blogPost.create);
router.route("/:id").get(blogPost.read).post(blogPost.create).delete(blogPost.delete)

module.exports = router;
/* ------------------------------------------------------- */