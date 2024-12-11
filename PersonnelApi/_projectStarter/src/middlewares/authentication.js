"use strict";

const Token = require("../models/token");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorazarion || null;
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey && tokenKey[0] == "Token") {
    const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
      "userId"
    );
    console.log(tokenData);
    if (tokenData) req.user = tokenData.userId;
    console.log(req.user);
  }
  next();
};
