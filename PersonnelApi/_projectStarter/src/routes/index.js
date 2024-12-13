"use strict";
const router = require("express").Router();

router.use("/auth", require("./auth"));
router.use("/tokens", require("./token"));
router.use("/personnel", require("./personnel"));
router.use("/deprtment", require("./department"));

module.exports = router;
