"use strict";

const { BlogCategory } = require("../models/blogCategory.models");
const { NotFoundError } = require("../errors/customError");

module.exporys.blogCategory = {
  list: async (req, res) => {
    const data = await BlogCategory.find();
    res.send({
      result: data,
    });
  },
  create: async (req, res) => {
    const result = await BlogCategory.create(req.body);
    res.send({
      result,
    });
  },
  read: async (req, res) => {
    const result = await BlogCategory.findOne(
      { _id: req.params.categoryId },
      { _id: 0, name: 1 }
    );
    if (!result) {
      throw new NotFoundError("No matching documents found");
    }
    res.send({
      isError: false,
      result,
    });
  },
  update: async (req, res) => {
    const result = BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );
    if (result.matchedCount === 0) {
      throw new NotFoundError("No matching documents found");
    }
    if (result.matchedCount > 0 && result.modifiedCount === 0) {
      return res.status(200).send({ message: "Document already up-to-date." });
    }
    res.status(202).send({
      isError: false,
      result,
      updated: await BlogCategory.findOne({ _id: req.params.categoryId }),
    });
  },
  delete: async (req, res) => {
    const result = await BlogCategory.deleteOne({ _id: req.params.categoryId });
    if (result.deletedCount === 0) {
      throw new NotFoundError("No matching documents found");
    }
    res.status(204).send({
      result,
    });
  },
};
