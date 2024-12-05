"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require("express").Router();
const { blogPost } = require("../controllers/blogPost.controller");

router.route("/post").get(blogPost.list).post(blogPost.create);
router
  .route("/cayegory/:postId")
  .get(blogPost.read)
  .put(blogPost.update)
  .patch(blogPost.update)
  .delete(blogPost.delete);

module.exports = router;
