"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const Product = require("../models/purchase");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Purchases);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Purchases),
      data,
    });
  },
};
