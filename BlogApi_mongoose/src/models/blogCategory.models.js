"use strict";

const mongoose = require("mongoose");

// const user = {
//   fisrtName: "John",
// };
// const ModelSchema = new mongoose.Schema(
//   {
//     fieldName: String,
//     fieldName1: {
//       type: Number,
//       default: 4,
//       trim: true,
//       unique: true,
//       enum: [["John", "Bruce"]],
//       validate: [() => true, "uyumsuz veri tipi"],
//       get: (data) => data,
//       set: (data) => data,
//       index: true,
//     },
//   },
//   {
//     collection: "tableName",
//     timestamps: true,
//   }
// );

// const ModelName = mongoose.model("ModelName", ModelSchema);
// module.exports = { ModelName };

const BlogCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    // creatAt // timestamps: true
    // updateAt // timestamps: true
  },
  {
    collection: "bloCategories",
    timestamps: true,
  }
);

module.exports = {
  BlogCategory: mongoose.model("BlogCategory", BlogCategorySchema),
};
