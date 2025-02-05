"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const Token = require("../models/tokens");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null; // Token ...tokenkey...
  const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...TokenKey...]

  if (tokenKey && tokenKey[0] == "Token") {
    const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
      "userId"
    );
    if (tokenData) req.user = tokenData.userId;
  }
  next();
};
