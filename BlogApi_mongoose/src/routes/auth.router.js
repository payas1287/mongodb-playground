"use strict";

const router = require("express").Router();
const { login, logout } = require("../controllers/auth.controller");

// URL: /auth/login
router.route("/logout").post(login);

//URL: /auth/logout
router.route("/logout").all(logout);

module.exports = router;
