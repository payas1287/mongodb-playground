"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const Token = require("../models/tokens");
module.exports = {
  list: async (req, res) => {
    /*
        #swagger.ignore = true
        */
    const data = await res.getModelList(Token);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Token),
      data,
    });
  },
  create: async (req, res) => {
    /*
    #swagger.ignore = true
    */
    const data = await Token.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /* 
    #swagger.ignore = true
    */
    const data = await Token.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },
  deletee: async (req, res) => {
    /* 
    #swagger.ignore = true
    */
    const data = await Token.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: false,
      message: "Somethimg went wrong, data might be deleted already.",
    });
  },
};
