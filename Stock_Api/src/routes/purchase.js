"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const { list, create, read, update, deletee } = require('../controllers/purchase');
const { isStaff, isLogin } = require('../middlewares/permissions');

// URL: /purchases


router.route('/').get(isLogin, list).post(isLogin, create);

router.route('/:id').get(isLogin, read).put(isStaff, update).patch(isStaff, update).delete(isStaff, deletee);

/* ------------------------------------------------------- */
module.exports = router;