"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/reservation:

const reservation = require("../controllers/reservation");
const {
  isLogin,
  isStaffOrLAdmin,
  isAdmin,
  isStaffOrAdmin,
} = require("../middlewares/permissions");

router
  .route("/:id")
  .get(isLogin, reservation.read)
  .put(isStaffOrAdmin, reservation.update)
  .patch(isStaffOrAdmin, reservation, reservation.update)
  .delete(isAdmin, reservation.delete);

module.exports = router;
