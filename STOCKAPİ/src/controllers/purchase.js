"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Purchase = require("../models/purchase");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Purchase);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Purchase),
      data,
    });
  },

  create: async (req, res) => {
    req.body.priceTotal = req.body.quantity * req.body.price;
    const data = await Purchase.create(...req.body, { userId: req.user._id , priceTotal: req.body.priceTotal});
    res.status(201).send({
      error: false,
      data,
    });
  },
};
