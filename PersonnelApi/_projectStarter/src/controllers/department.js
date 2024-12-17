"use strict";

const Depatment = require("../models/department");
const Personnel = require("../models/personnel");
module.exports = {
  list: async (req, res) => {
    /*
        #swagger.tags = ['Departments']
        #swagger.summary = 'List Departmentss'
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
    const data = await res.getModelList(Departments);
    res.status(200).send({
      error: false,
      data,
      detail: await res.getModelListDetails(Departments),
    });
  },
  create: async (req, res) => {
    /*
        #swagger.tags = ['Departments']
        #swagger.summary = 'Create Departments'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $ref: '#/definitions/Department'
            }
        }
    */
    const data = await Departmentss.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    /*
        #swagger.tags = ['Departments']
        #swagger.summary = 'Read Single Departments'
    */
    const data = await Departmentss.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    /*
        #swagger.tags = ['Departments']
        #swagger.summary = 'Update Departments'
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $ref: '#/definitions/Departments'
            }
        }
    */
    const data = await Departmentss.updateOne(
      { _id: req.params.id },
      req.body,
      {
        runValidators: true,
      }
    );
    res.status(202).send({
      error: false,
      data,
      new: await Departmentss.findOne({ _id: req.params.id }),
    });
  },
  delete: async (req, res) => {
    /*
        #swagger.tags = ['Departments']
        #swagger.summary = 'Delete Departments'
    */
    const data = await Departmentss.deleteOne({ _id: req.params.id });
    res.status(data.deleeCount ? 204 : 404).send({
      error: !data.deleeCount,
      data,
    });
  },
  personnels: async (req, res) => {
    /*
        #swagger.tags = ['Departments']
        #swagger.summary = 'Personnels Departments'
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
    const filter = { DepartmentssId: req.params.id };
    const data = await res.getModelList(Personnel, filtr, "DepartmentssId");
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Personnel, filter),
      data,
    });
  },
};
