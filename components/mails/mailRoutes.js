const { createMail, getMails, deleteMail } = require('./mailControllers');
const { loginRequired } = require('../authentication/authControllers');

const router = require('express').Router({mergeParams: true});

router.route("/createMail")
.post(loginRequired ,createMail)

router.route("/")
.get(loginRequired, getMails)
.delete(loginRequired)

router.route("/deleteMail/:id").delete(deleteMail)



module.exports = router