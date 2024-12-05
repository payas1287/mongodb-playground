"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */

const router = require("express").Router();
const { blogCategory } = require("../controllers/blogCategory.controller");

router.route("/cayegory").get(blogCategory.list).post(blogCategory.create);
router
  .route("/cayegory/:categoryId")
  .get(blogCategory.read)
  .put(blogCategory.update)
  .patch(blogCategory.update)
  .delete(blogCategory.delete);

module.exports = router;