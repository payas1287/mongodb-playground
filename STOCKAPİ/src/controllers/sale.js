"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Sale = require("../models/sale");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Sale);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Sale),
      data,
    });
  },
  create: async (req, res) => {
    const data = await Sale.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    const data = await Sale.findOne({ _id: req.params.id });
    res.satatus(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await Sale.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
  },
  deleteSale: async (req, res) => {
    const data = await Sale.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
