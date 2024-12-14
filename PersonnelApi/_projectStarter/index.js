"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const express = require("express");
const { dbConnection, mongoose } = require("./src/configs/dbConnection");
const app = express();

/* ------------------------------------------------------- */

// continue from here...
// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */

app.use(require('./src/middlewares/loger'))
app.use('/documents/json', (req, res) => {
  res.sendFile('swagger.json', { rot: '. '})
})
const swaggerUi = require('swagger-ui-express')
const swaggerJson = require('./swagger.json')
app.use('/document/swagger', swaggerUi.serve, swaggerJson, {swaggerOptions: {persistAuthorization: true}})

const redoc = require('redoc-express')
app.use('/documents/redoc', redoc({ specUrl: '/documents/json', title: 'Redoc UI'}))




//db connection
dbConnection();

//body parser
app.use(express.json());

// cookie: httpOnly:true XSS Cross Site Scripting, secure:https
const session = require("cookie-session");

// Run with general settings:
app.use(
  session({
    secret: process.env.SECRET_KEY,
    httpOnly: false,
  })
);

// res.getModelList():
app.use(require("./src/middlewares/findSearchSortPage"));

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to PERSONNEL API",
    session: req.session,
  });
});

//departments
app.use("/department", require("./src/routes/department"));
//personnels
app.use("/personnel", require("./src/routes/personnel"));

//not found routes
app.all("*", async (req, res) => {
  res.status(404).send({
    error: true,
    message: "Route not available",
  });
});

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()

if (process.env.NODE_ENV == "development") {
  return;
  require("./src/helpers/dataCreate")()
    .then((res) => console.log("Data synched"))
    .catch((err) => console.error("Data could not synched"));
}
