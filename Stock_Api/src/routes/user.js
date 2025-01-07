"use strict"
/* -------------------------------------------------------
    | FULLSTACK TEAM | NODEJS / EXPRESS |
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */

const { list, create, read, update, deletee } = require('../controllers/user');
const { isLogin, isAdmin, isStaff } = require('../middlewares/permissions')
// URL: /users



router.route('/').get(isAdmin, list).post(create);

router.route('/:id').get(isLogin, read).put(isLogin, update).patch(isLogin, update).delete(isAdmin, deletee);

/* ------------------------------------------------------- */
module.exports = router;