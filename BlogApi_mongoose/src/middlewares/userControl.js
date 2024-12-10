"use strict";
const { User } = require("../models/user.model");

module.exports = async (req, res, next) => {
  req.user = null;
  if (req.session?._id) {
    const { _id, password } = req.session;
    const user = await User.findone({ _id });
    if (user && user.password == password) {
      req.user = user;
    } else {
      req.user = null;
      req.session = null;
    }
  }
  next();
};
