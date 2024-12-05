"use strict";

const { user } = require("../models/user.model");
const { NotFoundError, BadRequestError } = require("../errors/customError");

module.exports.user = {
  list: async (req, res) => {
    const data = await User.find();
    res.send({
      result: data,
    });
  },
  create: async (req, res) => {
    if (!req.body.password || req.body.password.length < 8)
      throw new BadRequestError("password must be 8 characters long");
    const result = await User.create(req.body);
    res.send({
      result,
    });
  },
  read: async (req, res) => {
    if (req.body?.email) {
      const email = await User.findOne({ email: req.body.email });
      if (email) {
        throw new BadRequestError("This email is already in use");
      }
    }
    const result = await User.updateOne(
      { _id: req.params.userId },
      req.body,
      {}
    );
    res.status(202).send({
      isError: false,
      result,
      new: await User.findOne({ _id: req.params.userId }),
    });
  },
  delete: async (req, res) => {
    const result = await User.deleteOne({ _id: req.params.userId });
    if (result.deleteCount === 0) {
      throw new NotFoundError("No matching documents found");
    }
    res.status(204).send({
      result,
    });
  },
};
