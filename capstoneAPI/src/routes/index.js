"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/:

// URL: /

//* auth:
router.use("/auth", require("./auth"));
//* user:
router.use("/users", require("./user"));
//* token:
router.use("/tokens", require("./token"));
//*blogs:
router.use("/blogs", require("./blogs"));
//* comments:
router.use("/comments", require("./comments"));
//* category:
router.use("/categories", require("./category"));

/* ------------------------------------------------------- */
module.exports = router;
