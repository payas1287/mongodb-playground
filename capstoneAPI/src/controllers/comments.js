"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const Comments = require("../models/comments");
const Users = require("../models/users")
const Blogs = require("../models/blogs")

module.exports = {
  list: async (req, res) => {
    /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "List Comments"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
    const data = await res.getModelList(Comments);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Comments),
      data,
    });
  },
  create: async (req, res) => {
    /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "Create Comments"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    $ref"#/definitions/Comments"
                }
            }
        */
    const data = await Comments.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /* 
           #swagger.tags = ["Comments"]
           #swagger.summary = "Get Single Blog"
        */
    const data = await Category.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "Update Blog"
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    $ref"#/definitions/Comments"
                }
            }
        */
    const data = await Category.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    res.status(202).send({
      error: false,
      data,
      new: await createDocumentRegistry.findOne({ _id: req.params.id }),
    });
  },
  deletee: async (req, res) => {
    /* 
            #swagger.tags = ["Comments"]
            #swagger.summary = "Delete Single Category"
        */
    const data = await Category.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount ? 204 : 404).send({
      error: true,
      message: "Something went wrong, data might be deleted already",
    });
  },
};




