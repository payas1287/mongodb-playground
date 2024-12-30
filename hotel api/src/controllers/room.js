"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const Room = require("../models/room");

module.exports = {
  list: async (req, res) => {
    /*
            #swagger.tags = ["Rooms"]
            #swagger.summary = "List Rooms"
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
    const data = await res.getModelList(Room);

    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Room),
      data,
    });
  },

  //CRUD
  create: async (req, res) => {
    /*
            #swagger.tags = ["Rooms"]
            #swagger.summary = "Create Rooms"
        */
    const { bed_type, bed_space } = req.body;
    if (bed_type == "family" || bed_type == "King") {
      if (!bed_space) throw new Error("bed space required");
      if (!(bed_space >= 3 && bed_space <= 7)) {
        throw new Error("Bed space must be between 3 and 7");
      }
    }

    if (req.file) {
      req.body.image = req.file.filename;
    }
    console.log(req.body);
    console.log(req.file);

    const data = await Room.create(req.body);

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */
    const data = await Room.findOne({ _id: req.params.id });

    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    /*
            #swagger.tags = ["Rooms"]
            #swagger.summary = "Update Rooms"
        */
    const { bed_type, bed_space } = req.body;
    if (bed_type == "family" || bed_type == "King") {
      if (!bed_space) throw new Error("bed space required");
      if (!(bed_space >= 3 && bed_space <= 7)) {
        throw new Error("Bed space must be between 3 and 7");
      }
    }

    const data = await Room.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    res.status(202).send({
      error: false,
      data,
      new: await Room.findOne({ _id: req.params.id }),
    });
  },

  delete: async (req, res) => {
    /*
            #swagger.tags = ["Rooms"]
            #swagger.summary = "Delete Room"
        */

    const data = await Room.deleteOne({ _id: req.params.id });

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
