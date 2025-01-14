"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */

const { list, create, update, deletee } = require("../controllers/token");
const { isAdmin } = require("../middlewares/permissions");

// URL: /tokens

router.use(isAdmin);

 router.route("/").get(list).post(create);

router.route("/:id").put(update).patch(update).delete(deletee);

/* ------------------------------------------------------- */
module.exports = router;
