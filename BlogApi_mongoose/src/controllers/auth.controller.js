"use strict";

const { User } = require("../models/user.model");
const passwordEncrypt = require("../helper/passwordEncrypt");

module.exports = {
    login: async (req, res) => {
        const { email, password} = req.body
        if ( email && password) {
            const user = await User.findOne({ email })
        }
    }
}