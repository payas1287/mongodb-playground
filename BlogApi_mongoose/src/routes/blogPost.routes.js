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

module.exports = router;
/* ------------------------------------------------------- */