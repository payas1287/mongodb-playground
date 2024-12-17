"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Order Controller:

const Order = require("../models/order");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "List Orders"
            #swagger.description = `
                You can send query with endpoint for filter[], search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>filter[field1]=value1&filter[field2]=value2</b></li>
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
  },

  // CRUD:

  create: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Create Order"
        */
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Get Single Order"
        */
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Update Order"
        */
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Orders"]
            #swagger.summary = "Delete Order"
        */
  },
};
