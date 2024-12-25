"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Reservation Controller:
const Reservation = require("../models/reservation");

module.export = {
  list: async (req, res) => {
    let customFilter = {};
    if ((!req.user.isAdmin && !req, user.isStaff)) {
      customFilter = { userId: req.user._id };
    }
    const data = await res.getModelList(Reservation, customFilter, [
      { path: "userId", select: "username firstnme lastname" },
      { path: "carId" },
      { path: "createdId", select: "username" },
      { path: "updatedId", select: "username" },
    ]);
    const details = await res.getModelListDetails(Reservation, customFilter);
    res.status(200).send({
      error: false,
    });
  },

  create: async (req, res) => {
    const userResevationDates = await Reservation.finOne({
      userId: req.body.userId,
      $nor: [
        { startDate: { $gt: req.body.enddate } },
        { endDate: { $lt: req.body.startDate } },
      ],
    });
    if (userResevationDates) {
      res.errorStatusCode = 400;
      throw new Error(
        "It cannot be added because tere is another reservation with the same date",
        { cause: { userResevationDates: userResevationDates } }
      );
    } else {
      const data = await Reservation.create(req.body);
      res.status(200).send({
        error: false,
        data,
      });
    }
  },

  read: async (req, res) => {
    let customFilter = {};

    if (!req.user.isAdmin && !req.usr.isStaff) {
      customFilter = { userId: req.user._id };
    }

    const data = await Reservation.findOne({
      _id: req.params.id,
      ...customFilter,
    }).populate([
      { path: "userId", select: "username firstnme lastname" },
      { path: "carId" },
      { path: "createdId", select: "username" },
      { path: "updatedId", select: "username" },
    ]);
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    if (!req.user.isAdmin) {
      delete req.body.userId;
    }
    req.body.updatedId = req.user._id;
    const data = await Reservation.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      data,
      new: await Reservation.findOne({ _id: req.params.id }),
    });
  },
  delete : async (req,res) => {
    const data = await Car.deleteOne({ _id: req.params.id })

    res.status(data.deletedCount ? 204 : 404).send({
        error: !data.deletedCount,
        data
    })
  }
};
