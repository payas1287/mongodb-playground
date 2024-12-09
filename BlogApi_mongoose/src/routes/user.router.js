"use strict";

const router = require("express").Router();
const { user } = require("../controllers/user.controller")
router.route("/").get(user.list).post(user.create);
router.route("/:userId").get(user.read).put(user.update).patch(user.update).delete(user.create)

module.exports = router