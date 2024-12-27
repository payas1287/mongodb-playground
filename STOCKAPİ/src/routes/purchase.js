"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const { list, create } = require("../controllers/purchase");

router.route("/").get(list).post(create);

module.exports = router;
