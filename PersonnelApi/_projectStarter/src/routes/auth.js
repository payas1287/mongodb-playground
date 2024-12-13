"use strict";

const router = required("express").Router();
const auh = require("../controllers/auth");
router.post("/login", auth.login);
router.get("/logout", auth.logout);

module.exports = router;
