"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
/*
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i morgan swagger-autogen swagger-ui-express redoc-express
    $ mkdir logs
    $ nodemon
*/
const express = require("express");
const app = express();

/* ------------------------------------------------------- */
// Required Modules:

// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

// Logger:
app.use(require("./src/middlewares/logger"));

//! Auhentication:
app.use(require("./src/middlewares/authentication"));

// findSearchSortPage / res.getModelList:
app.use(require("./src/middlewares/queryHandler"));

//const nodemailer = require("nodemailer");

//nodemailer.createTestAccount().then((data) => console.log(data));

// {
//   user: 'mpw7bnc2cw4rgsqc@ethereal.email',
//   pass: 'v2gVc9S6YEkMcyaM4h',
//   smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
//   imap: { host: 'imap.ethereal.email', port: 993, secure: true },
//   pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
//   web: 'https://ethereal.email',
//   mxEnabled: false
// }

// const transpoter = nodemailer.createTransport({
//   // SMTP:
//   host: "smtp.ethereal.email",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "mpw7bnc2cw4rgsqc@ethereal.email",
//     pass: "v2gVc9S6YEkMcyaM4h",
//   },
// });
//console.log(transpoter)

// SendMail:
// transpoter.sendMail(
//   {
//     from: "mpw7bnc2cw4rgsqc@ethereal.email",
//     to: "payas@gmail.com",
//     subject: "Hello",
//     text: "Hello there. How are you?",
//     html: "<h2>Hello there.</h2> <p>how are you?</p>",
//   },
//   function (error, success) {
//     success ?console.log('SUCCESS:', success) : console.log('EROR:', error)
//   }

// );

//* GoogleMAil (gmail.com)

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "sehzade172041@gmail.com",
//     pass: "kcal qkpg nnkv onf",
//   },
// });
// transpoter.sendMail(
//   {
//     to: "sehzadem172041@gmail.com",
//     subject: "Hello",
//     text: "Hello there. How are you?",
//     html: "<h2>Hello there.</h2> <p>how are you today?</p>",
//   },
//   function (error, success) {
//     success ? console.log("SUCCESS:", success) : console.log("EROR:", error);
//   }
// );

//* YandexMail (yandex)

// const transporter = nodemailer.createTransport({
//     service: 'yandex',
//     auth: {
//         user: 'test@yandex.com',
//         pass: '11' // your email-password
//     }
// })

/* ------------------------------------------------------- */
// Routes:

//! routes/index.js:
app.use("/", require("./src/routes/"));

/* ------------------------------------------------------- 
// auth:
app.use("/auth", require("./src/routes/auth"));
// user:
app.use("/user", require("./src/routes/user"));
// token:
app.use("/token", require("./src/routes/token"));

// order:
app.use("/order", require("./src/routes/order"));
// pizza:
app.use("/pizza", require("./src/routes/pizza"));
// topping:
app.use("/topping", require("./src/routes/topping"));

// document:
app.use("/documents", require("./src/routes/document"));
/* ------------------------------------------------------- */
// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PIZZA API",
    docs: {
      swagger: "/documents/swagger",
      redoc: "/documents/redoc",
      json: "/documents/json",
    },
    user: req.user,
  });
});

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// !!! It clear database.
// require("./src/helpers/sync")();
