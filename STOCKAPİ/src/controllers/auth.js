"use strict";
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */

const User = require("../models/user");
const Token = require("../models/token");
const {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} = require("../errors/customErrors");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  login: async (req, res) => {
    const { username, email, password } = req.body;
    if (!((username || email) && password)) {
      //throw new BadRequestError("Username/email or password is required");
      req.errorStatusCode = 401;
      throw new Error("Please enter username/email and password");
    }
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      throw new NotFoundError("username/email is not found");
    }
    if (user.password !== passwordEncrypt(password)) {
      throw new UnauthorizedError("password is imcorrect");
    }
    let tokenData = await Token.findOne({ userId: user._id });
    if (!tokenData) {
      const tokenKey = passwordEncrypt(user._id + Date.now());
      tokenData = await Token.create({ userId: user._id, token: tokenKey });
    }
    res.status(200).send({
      error: false,
      data: tokenData.token,
      user,
    });
  },

  refresh: async () => {},
  logout: async (req, res) => {
    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;
    let deleted = null;
    if (!tokenKey) {
      return res.status(400).send({
        error: true,
        message: "invalid token",
      });
    }
    if (tokenKey?.at(0) === "Token") {
      deleted = await Token.deleteOne({ token: tokenKey[1] });
    }
    res.send({
      error: false,
      message: "Logout was OK.",
      data: tokenData,
    });
  },
};
