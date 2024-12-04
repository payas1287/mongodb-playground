"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require("express").Router();
const { blogCategory } = require("../controllers/blogCategory.controller ");
// Call Controllers:

/* ------------------------------------------------------- */

// URL: /blog ->
router.route("/").get(blogCategory.list).post(blogCategory.create).put(blogCategory.read).delete(blogCategory.delete);
router.route("/:id").get(blogCategory.read).delete(blogCategory.delete).put(blogCategory.update)
// BlogCategory

module.exports = router;
