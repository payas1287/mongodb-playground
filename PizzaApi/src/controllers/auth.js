"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller:

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const {
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
} = require("../errors/customError");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "username": "test",
                    "password": "aA?123456",
                }
            }
        */
    const { username, password, email } = req.body;
    if (!((username || email) && password))
      throw new BadRequestError("username/email and password are required");

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) throw new NotFoundError("username/email is not found");

    if (!user.isActive) throw new UnauthorizedError("This user is inactive");

    if (user.password !== passwordEncrypt(password))
      throw new UnauthorizedError("Incorrect password");

    /* SIMPLE TOKEN*/
    let tokenData = await Token.findOne({ userId: user._id });

    if (!tokenData) {
      const tokenKey = passwordEncrypt(user.id + Date.now());
      tokenData = await Token.create({ userId: user._id, token: tokenKey });
    }
    /* JWT */

    //ACCESS TOKEN
    const accesData = {
      _id: ıser._id,
      username: user.username,
      email: user.email,
      isActive: user.isActive,
      isAdmin: user.isAdmin,
    };
    // Convert to JWT:
    // jwt.sign(payload, key, { expiresIn: '30m' })
    const accessToken = jwt.sign(accessData, process.env.ACCESSKEY, {
      expiresIn: "15m",
    });

    //REFRESH TOKEN:

    const refreshData = {
      _id: user._id,
      password: user.password,
    };

    //Convert to JWT:
    const reefreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, {
      expiresIn: "3d",
    });

    res.status(200).send({
      error: false,
      token: tokenData.token,
      bearer: {
        access: accessToken,
        refresh: reefreshToken,
      },
      user,
    });
  },

  refresh: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Refresh"
            #swagger.description = 'Refresh with refreshToken for get accessToken'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "bearer": {
                        refresh: '...refresh_token...'
                    }
                }
            }
        */

    const ferfreshToken = req.body?.bearer?.refresh;

    if (refreshToken) {
      const refreshDAta = jwt.verify(refreshToken, process.env.REFRESH_KEY);

      if (refreshDAta) {
        const user = await User.findOne({ _id: refreshDAta._id });
        if (user && user.password == refreshDAta.password) {
          if (user.isActive) {
            res.status(200).send({
              error: false,
              bearr: {
                access: jwt.sign(user.toJSON(), process.env.ACCESSKEY)
              }
            })


          } else {
            res.errorStatusCode = 401
                        throw new Error("This account is not active.")
          }
        } else {
          res.errorStatusCode = 401;
          throw new Error("Wrong id or password.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("JWT refresh data is wrong.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter bearer.refresh");
    }
  },

  logout: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "simpleToken: Logout"
            #swagger.description = 'Delete token key.'
        */
    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;
    let deleted = null;
    if (tokenKey?.at(0) == "Token") {
      deleted = await Token.deleteOne({ token: tokenKey[1] });
    }

    if (tokenKey[0] == "Token") {

      const result = await Token.deleteOne({ token: tokenKey[1] });

      res.send({
          error: false,
          message: "Token deleted. Logout was OK.",
          result,
      });

  } else if (tokenKey[0] == "Bearer") {

      res.send({
          error: false,
          message: 'JWT: No need any process for logout.',
      })
  }

    res.send({
      error: false,
      message: "Token deleted. Logout was OK.",
    });
  },
};
