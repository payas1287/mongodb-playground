"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const Token = require("../models/token");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(" ") : null;

  if (token && tokenKey[0] == "Token") {
    const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
      "userId"
    );
    if (tokenData) req.user = tokenData.userId;
  }
  next();
};
