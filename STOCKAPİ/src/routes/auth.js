"use strict";

const router = require("express").Router();

const {login, logout} = require("../controllers/auth");
router.post("/login", login);
router.route("/logout").get(logout)


module.exports = router;
