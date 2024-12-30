"use strict";

const nodemailer = require("nodemailer");

module.exports = function (to, title, message) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sehzade172041@gmail.com",
      pass: "stgs qidj eece zphq",
    },
  });
  transporter.sendMail(
    {
      from: "sehzade172041@gmail.com",
      to: to,
      text: message,
      html: message,
    },
    function (error, success) {
      success ? console.log("SUCCESS:", success) : console.log("ERROR:", error);
    }
  );
};
