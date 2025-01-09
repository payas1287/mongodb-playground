"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- *
$ npm init -y
$ npm i express dotenv express-async-errors
$ echo PORT=8000 > .env
$ npm i sequelize sqlite3
/* ------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Accept JSON data and convert to object (for API):
app.use(express.json());

// express-async-errors: catch async-errors and send to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Template:
// npm i ejs
app.set("view engine", "ejs");
// default tamplate folder : ./views
app.set("views", "./public");

/* ------------------------------------------------------- */
//* Routes:
app.all("/", (req, res) => {
  // res.render('index.ejs')
  // res.render('index')

  res.send(` <p><a href="/views">Todo Template</a></p>
        <p><a href="api">Todo RestAPY</a></p>`);
});

app.use("/todos", require("./app/routes/todo.router"));

/* ------------------------------------------------------- */
const errorHandler = (err, req, res, next) => {
  const errorStatusCode = res.errorStatusCode ?? 500;
  console.log("errorHandler worked.");
  res.status(errorStatusCode).send({
    error: true, // special data
    message: err.message, // error string message
    cause: err.cause, // error option cause
    // stack: err.stack, // error details
  });
};
app.use(errorHandler);
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
