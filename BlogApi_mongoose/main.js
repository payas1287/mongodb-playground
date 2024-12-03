"use strict";

const express = require("express");
require("express-async-errors");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;
app.use(express.json());
require("./src/config/dConnection")();
app.call("/", (req, res) => {
  res.send("Welcome to BlogApı");
});
app.use("*", (req, res) => {
  res.status(404).send({ isError: true, message: "The route is Not Found" });
});

app.use(require("./src/middlewares/errorHandler"));

app.listen(PORT, () => console.log("Running: http://127.0.01:" + PORT));
