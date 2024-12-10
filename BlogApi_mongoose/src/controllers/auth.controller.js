"use strict";

const { User } = require("../models/user.model");
const passwordEncrypt = require("../helper/passwordEncrypt");

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body
        if (email && password) {
            const user = await User.findOne({ email })
            if (user) {
                if (user.password == passwordEncrypt(password)) {
                    req.session._id = user._id
                    req.session.password = user.password
                    if (req.body?.remindMe) {
                        req.session.remindMe = true
                        req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3
                    }
                    res.status(200).send({
                        error: false,
                        message: 'Login OK',
                        user
                    })
                } else {
                    res.errorStatusCode = 401
                    throw new Error('Login parameters are not true.')
                }
            } else {
                res.errorStatusCode = 401
                throw new Error('This user not found')
            }
        } else {
            res.errorStatusCode = 401
            throw new Error('Email and password are required.')
        }
    },
    logout: async (req, res) => {
        req.session = nullres.status(200).send({
            error: false,
            message: 'Logout OK'
        })
    },
}