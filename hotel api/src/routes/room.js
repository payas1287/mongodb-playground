"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();

const room = require("../controllers/room");
const upload = require("../middlewares/upload");

router.route("/").get(room.list).post(upload.single("image"), room.create);

router
  .route("/:id")
  .get(room.read)
  .put(upload.single("image"), room.update)
  .patch(upload.single("image"), room.update)
  .delete(room.delete);

module.exports = router;
