"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const {
  list,
  create,
  read,
  update,
  deleteBrand,
} = require("../controllers/brand");

router.route("/").get(list).post(create);

router.route("/:id").get(read).put(update).patch(update).delete(deleteBrand);

module.exports = router;
