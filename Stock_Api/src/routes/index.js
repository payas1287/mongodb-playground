"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/:

// URL: /

// auth:
router.use('/auth', require('./auth'))
// user:
router.use('/users', require('./user'))
// token:
router.use('/tokens', require('./token'))


// firm:
router.use('/firms', require('./firm'))
// category:
router.use('/categories', require('./category'))
// brand:
router.use('/brands', require('./brand'))
// product:
router.use('/products', require('./product'))
// purchase:
router.use('/purchases', require('./purchase'))
// sale:
router.use('/sales', require('./sale'))

// document:
router.use('/documents', require('./document'))

/* ------------------------------------------------------- */
module.exports = router