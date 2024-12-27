"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
/* ------------------------------------------------------- */
const {
    list,
    create,
    read,
    update,
    deleteFirm,
  } = require("../controllers/firm");
  
  router.route("/").get(list).post(create);
  
  router.route("/:id").get(read).put(update).patch(update).delete(deleteFirm);
  
  module.exports = router;
  