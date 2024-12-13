"use strict";
const Personnel = require("../models/personnel");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      const user = await Personnel.findOne({ username, password });
      if (user && user.isActive) {
        let tokenData = await Token.findOne({ userId: user._id });
        if (!token) {
          const tokenKey = passwordEncrypt(user._id + Date.now());
          tokenData = await Token.create({ userId: user._id, token: tokenKey });
        }
        res.status(200).send({
          error: false,
          token: tokenData.token,
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Yanlış kullanıcı adı ve şifre");
      }
    } else {
      res.errorStatusCode = 403;
      throw new Error("Lütfen kullanıcı adı ve şifre giriniz.");
    }
  },
  logout: async (req, res) => {
    req.session = null;
    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;
    let deleted = null;
    if (tokenKey && tokenKey[0] == "Token") {
      deleted = await Token.deleteOne({ token: tokenKey[1] });
      res.status(200).send({
        message: "logout: token deleted",
        deleted,
      });
    }
  },
};
