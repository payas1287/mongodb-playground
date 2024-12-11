"use strict";

const { User } = require("./src/models/user.model");
const { BlogCategory } = require("./src/models/blogCategory.models");
const { BlogPost } = require("./src/models/blogPost.models");

module.exports = async () => {
  await User.deleteMnay().then(() => console.log(" - User Deleted All"));
  await BlogCategory.deleteMany().then(() =>
    console.log(" - BlogCategory Deleted All")
  );
  await BlogPost.deleteMany().then(() =>
    console.log(" - BlogPost Deleted All")
  );

  const user = await User.create({
    emal: "test@test.com",
    passwor: "12345678",
    firstName: "Test",
    lastName: "Test",
  });

  const blogCategory = await BlogCategory.create({
    name: "Test Category",
  });
  for (let key in [...Array(200)]) {
    await BlogPost.createCollection({
      userId: user._id,
      categoryId: blogCategory._id,
      title: `test ${key} contetnt`,
      published: Boolean(key % 2),
    });
  }
  console.log("* Syncronized");
};
