"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */

const Token = require("../models/token");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null;
  const tokenKey = auth ? auth.split(" ") : null;

  if (tokenKey) {
    if (tokenKey && tokenKey[0] == "Token") {
      // SINPLE TOKEN
      const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
        "userId"
      );
    }

    //console.log(tokenData);
    if (tokenData) req.user = tokenData.userId;
  } else if (tokenKey[0] == "Bearer") {
    jwt.verify(
      tokenKey[1],
      process.env.ACCCESS_KEY,
      function (error, accessData) {
        console.log(accessData);
        if (accessData) req.user = accessData;
      }
    );
  }
  //console.log("---------", req.user);
  next();
};
